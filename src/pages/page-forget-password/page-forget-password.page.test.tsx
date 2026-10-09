import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '@/services'
import { PageForgetPassword } from './page-forget-password.page'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}))

jest.mock('@/services', () => ({
  api: {
    password: {
      requestPasswordRecovery: jest.fn(),
      resendRecoveryCode: jest.fn(),
      verifyRecoveryCode: jest.fn(),
      confirmPasswordRecovery: jest.fn(),
    },
  },
}))

const password = api.password as jest.Mocked<typeof api.password>
const ok = { status: 201 } as never

function apiError(status: number, message: string) {
  return Object.assign(new Error(message), {
    isAxiosError: true,
    response: { status, data: { statusCode: status, message } },
  })
}

function renderPage() {
  render(
    <MemoryRouter>
      <PageForgetPassword />
    </MemoryRouter>
  )
}

function type(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), {
    target: { value },
  })
}

function tick(seconds: number) {
  for (let i = 0; i < seconds; i++) {
    act(() => {
      jest.advanceTimersByTime(1000)
    })
  }
}

async function goToCodeStep() {
  type('E-mail', 'ana@ufba.br')
  fireEvent.click(screen.getByRole('button', { name: 'Enviar código' }))
  await screen.findByLabelText('Código de verificação')
}

async function goToNewPasswordStep() {
  await goToCodeStep()
  type('Código de verificação', '123456')
  fireEvent.click(screen.getByRole('button', { name: 'Validar código' }))
  await screen.findByLabelText('Nova senha')
}

describe('PageForgetPassword', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    password.requestPasswordRecovery.mockResolvedValue(ok)
    password.resendRecoveryCode.mockResolvedValue(ok)
    password.verifyRecoveryCode.mockResolvedValue(ok)
    password.confirmPasswordRecovery.mockResolvedValue(ok)
  })

  it('pede o código com e-mail e cargo e passa para a etapa do código', async () => {
    renderPage()

    await goToCodeStep()

    expect(password.requestPasswordRecovery).toHaveBeenCalledWith({
      email: 'ana@ufba.br',
      role: 'STUDENT',
    })
    expect(screen.queryByLabelText('Nova senha')).not.toBeInTheDocument()
  })

  it('só libera a nova senha depois que o código é validado', async () => {
    password.verifyRecoveryCode.mockRejectedValueOnce(
      apiError(400, 'Código inválido.')
    )
    renderPage()
    await goToCodeStep()

    type('Código de verificação', '000000')
    fireEvent.click(screen.getByRole('button', { name: 'Validar código' }))

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Código inválido.')
    )
    expect(screen.queryByLabelText('Nova senha')).not.toBeInTheDocument()

    type('Código de verificação', '123456')
    fireEvent.click(screen.getByRole('button', { name: 'Validar código' }))

    expect(await screen.findByLabelText('Nova senha')).toBeInTheDocument()
    expect(password.verifyRecoveryCode).toHaveBeenLastCalledWith({
      email: 'ana@ufba.br',
      role: 'STUDENT',
      code: '123456',
    })
  })

  it('só libera o reenvio depois de 1 minuto e reinicia a contagem', async () => {
    jest.useFakeTimers()
    renderPage()
    await goToCodeStep()

    expect(
      screen.getByRole('button', { name: 'Reenviar código em 1:00' })
    ).toBeDisabled()

    tick(59)
    expect(
      screen.getByRole('button', { name: 'Reenviar código em 0:01' })
    ).toBeDisabled()

    tick(1)
    fireEvent.click(screen.getByRole('button', { name: 'Reenviar código' }))
    await act(async () => {})

    expect(password.resendRecoveryCode).toHaveBeenCalledWith({
      email: 'ana@ufba.br',
      role: 'STUDENT',
    })
    expect(
      screen.getByRole('button', { name: 'Reenviar código em 1:00' })
    ).toBeDisabled()
  })

  it('redefine a senha com o código validado e volta para o login', async () => {
    renderPage()
    await goToNewPasswordStep()

    type('Nova senha', 'nova1')
    type('Confirmar nova senha', 'nova1')
    fireEvent.click(screen.getByRole('button', { name: 'Redefinir senha' }))

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
    )
    expect(password.confirmPasswordRecovery).toHaveBeenCalledWith({
      email: 'ana@ufba.br',
      role: 'STUDENT',
      code: '123456',
      new_password: 'nova1',
      confirm_new_password: 'nova1',
    })
  })

  it('não envia a nova senha quando a confirmação é diferente', async () => {
    renderPage()
    await goToNewPasswordStep()

    type('Nova senha', 'nova1')
    type('Confirmar nova senha', 'nova2')
    fireEvent.click(screen.getByRole('button', { name: 'Redefinir senha' }))

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'A senha e o confirmar senha são diferentes.'
      )
    )
    expect(password.confirmPasswordRecovery).not.toHaveBeenCalled()
  })

  it('quando o código expira antes de confirmar, volta para a etapa do código', async () => {
    password.confirmPasswordRecovery.mockRejectedValueOnce(
      apiError(400, 'Este código expirou ou já foi utilizado.')
    )
    renderPage()
    await goToNewPasswordStep()

    type('Nova senha', 'nova1')
    type('Confirmar nova senha', 'nova1')
    fireEvent.click(screen.getByRole('button', { name: 'Redefinir senha' }))

    expect(
      await screen.findByLabelText('Código de verificação')
    ).toHaveValue('')
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
