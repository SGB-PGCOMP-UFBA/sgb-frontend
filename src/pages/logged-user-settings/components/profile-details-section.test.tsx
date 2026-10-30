import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import { api } from '@/services'
import type { StoredUser } from '@/helpers/auth-user.helper'
import type { ManagedUser } from '@/types'
import { ProfileDetailsSection } from './profile-details-section'

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}))

jest.mock('@/services', () => ({
  api: {
    user: {
      getProfile: jest.fn(),
      updateProfile: jest.fn(),
    },
  },
}))

const userApi = api.user as jest.Mocked<typeof api.user>

/** O login nao traz o Lattes: e assim que o usuario fica no localStorage. */
const STORED_STUDENT = {
  access_token: 'token',
  id: 9,
  role: 'STUDENT',
  name: 'Igor Estudante',
  email: 'igor@ufba.br',
  tax_id: '52998224725',
  phone_number: null,
} as StoredUser

const PROFILE: ManagedUser = {
  id: 9,
  role: 'STUDENT',
  name: 'Igor Estudante',
  email: 'igor@ufba.br',
  tax_id: '52998224725',
  phone_number: null,
  status: null,
  link_to_lattes: 'http://lattes.cnpq.br/1',
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
}

/** O retrato inicial do `useFormChanges` e tirado num `setTimeout(0)`. */
async function waitForFormSnapshot() {
  await act(() => new Promise(resolve => setTimeout(resolve, 0)))
}

async function renderLoaded(user: StoredUser = STORED_STUDENT) {
  render(<ProfileDetailsSection user={user} />)
  await screen.findByLabelText('Link para o Lattes')
  await waitForFormSnapshot()
}

describe('ProfileDetailsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    userApi.getProfile.mockResolvedValue({ data: PROFILE } as never)
    userApi.updateProfile.mockResolvedValue({ data: PROFILE } as never)
  })

  it('preenche o formulario com o cadastro de GET /me, inclusive o Lattes', async () => {
    await renderLoaded()

    expect(userApi.getProfile).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Link para o Lattes')).toHaveValue(
      'http://lattes.cnpq.br/1'
    )
  })

  it('ao salvar so o telefone, envia o Lattes que ja estava gravado', async () => {
    await renderLoaded()

    fireEvent.change(screen.getByLabelText('Telefone'), {
      target: { value: '71999990000' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    await waitFor(() => expect(userApi.updateProfile).toHaveBeenCalled())
    expect(userApi.updateProfile.mock.calls[0][0]).toMatchObject({
      link_to_lattes: 'http://lattes.cnpq.br/1',
    })
    expect(toast.success).toHaveBeenCalled()
  })

  it('enquanto o perfil carrega, nao mostra o formulario', () => {
    userApi.getProfile.mockReturnValue(new Promise(() => {}))
    render(<ProfileDetailsSection user={STORED_STUDENT} />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando perfil')
    expect(
      screen.queryByRole('button', { name: 'Salvar' })
    ).not.toBeInTheDocument()
  })

  it('se o perfil nao carrega, avisa e nao deixa salvar com campos vazios', async () => {
    userApi.getProfile.mockRejectedValue(new Error('rede'))
    render(<ProfileDetailsSection user={STORED_STUDENT} />)

    expect(
      await screen.findByText(/Não foi possível carregar o seu perfil/)
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Salvar' })
    ).not.toBeInTheDocument()
  })

  it('o CPF so e obrigatorio para estudante', async () => {
    userApi.getProfile.mockResolvedValue({
      data: { ...PROFILE, role: 'ADVISOR', link_to_lattes: null, tax_id: null },
    } as never)
    render(
      <ProfileDetailsSection user={{ ...STORED_STUDENT, role: 'ADVISOR' }} />
    )

    expect(await screen.findByLabelText('CPF')).not.toBeRequired()
    expect(screen.queryByLabelText('Link para o Lattes')).not.toBeInTheDocument()
  })
})
