import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DialogExclusaoUsuario } from './dialog-exclusao-usuario'
import type { ManagedUser, ScholarshipSummary } from '@/types'

const student: ManagedUser = {
  id: 7,
  role: 'STUDENT',
  name: 'Maria Souza',
  email: 'maria@ufba.br',
  tax_id: null,
  phone_number: null,
  status: null,
  link_to_lattes: null,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
}

const advisor: ManagedUser = {
  ...student,
  id: 8,
  role: 'ADVISOR',
  name: 'Prof. João',
}

function scholarship(
  overrides: Partial<ScholarshipSummary> = {}
): ScholarshipSummary {
  return {
    id: 12,
    status: 'ON_GOING',
    scholarship_starts_at: '2024-03-01',
    scholarship_ends_at: '2026-02-28',
    extension_ends_at: null,
    agency_name: 'CAPES',
    allocation_name: null,
    enrollment_number: '2024001',
    enrollment_program: 'MESTRADO',
    student: { id: 7, name: 'Maria Souza' },
    advisor: { id: 8, name: 'Prof. João' },
    ...overrides,
  }
}

function renderDialog(
  props: Partial<React.ComponentProps<typeof DialogExclusaoUsuario>> = {}
) {
  const onClose = jest.fn()
  const onConfirm = jest.fn()

  render(
    <MemoryRouter>
      <DialogExclusaoUsuario
        item={student}
        isOpen
        onClose={onClose}
        onConfirm={onConfirm}
        {...props}
      />
    </MemoryRouter>
  )

  return { onClose, onConfirm }
}

describe('DialogExclusaoUsuario', () => {
  it('confirma a exclusão quando o usuário não tem bolsa ativa', () => {
    const { onConfirm, onClose } = renderDialog()

    expect(screen.queryByRole('list', { name: 'Bolsas ativas' })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(onConfirm).toHaveBeenCalledWith(student)
    expect(onClose).toHaveBeenCalled()
  })

  it('bloqueia a exclusão e lista o link de cada bolsa ativa', () => {
    const { onConfirm } = renderDialog({
      activeScholarships: [
        scholarship(),
        scholarship({ id: 13, agency_name: 'CNPq' }),
      ],
    })

    expect(screen.getByText(/possui 2 bolsas ativas/)).toBeInTheDocument()
    const links = within(
      screen.getByRole('list', { name: 'Bolsas ativas' })
    ).getAllByRole('link', { name: /Ver bolsa/ })
    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '/bolsas/12',
      '/bolsas/13',
    ])

    const deleteButton = screen.getByRole('button', { name: 'Excluir' })
    expect(deleteButton).toBeDisabled()
    fireEvent.click(deleteButton)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('fecha o diálogo ao seguir o link da bolsa', () => {
    const { onClose } = renderDialog({ activeScholarships: [scholarship()] })

    fireEvent.click(screen.getByRole('link', { name: /Ver bolsa/ }))

    expect(onClose).toHaveBeenCalled()
  })

  it('mostra o nome do bolsista quando quem será excluído é orientador', () => {
    renderDialog({ item: advisor, activeScholarships: [scholarship()] })

    expect(
      screen.getByText('Maria Souza · CAPES · MESTRADO')
    ).toBeInTheDocument()
  })

  it('desabilita a exclusão enquanto verifica as bolsas', () => {
    renderDialog({ isCheckingScholarships: true })

    expect(screen.getByRole('status')).toHaveTextContent('Verificando bolsas')
    expect(screen.getByRole('button', { name: 'Excluir' })).toBeDisabled()
  })
})
