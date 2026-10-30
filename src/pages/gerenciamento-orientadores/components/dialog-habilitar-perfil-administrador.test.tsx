import { fireEvent, render, screen } from '@testing-library/react'
import { DialogHabilitarPerfilAdministrador } from './dialog-habilitar-perfil-administrador'
import type { AdvisorDetailed } from '@/types'

function advisor(has_admin_privileges: boolean): AdvisorDetailed {
  return {
    id: 7,
    name: 'Ana Orientadora',
    email: 'ana@ufba.br',
    role: 'ADVISOR',
    status: 'ACTIVE',
    tax_id: null,
    phone_number: null,
    enrollmentsCount: 0,
    has_admin_privileges,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
}

function renderDialog(hasAdminPrivileges: boolean) {
  const onSubmit = jest.fn()
  const onClose = jest.fn()

  render(
    <DialogHabilitarPerfilAdministrador
      item={advisor(hasAdminPrivileges)}
      isOpen
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: 'Sim' }))

  return { onSubmit, onClose }
}

describe('DialogHabilitarPerfilAdministrador', () => {
  it('quando o orientador não é administrador, pede para habilitar', () => {
    const { onSubmit, onClose } = renderDialog(false)

    expect(onSubmit).toHaveBeenCalledWith(7, true)
    expect(onClose).toHaveBeenCalled()
  })

  it('quando o orientador já é administrador, pede para desabilitar', () => {
    const { onSubmit } = renderDialog(true)

    expect(onSubmit).toHaveBeenCalledWith(7, false)
  })
})
