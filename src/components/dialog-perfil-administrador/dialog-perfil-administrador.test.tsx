import { fireEvent, render, screen } from '@testing-library/react'
import { DialogPerfilAdministrador } from './dialog-perfil-administrador'
import type { ManagedUser, UserRole } from '@/types'

function advisor(role: UserRole): ManagedUser {
  return {
    id: 7,
    name: 'Ana Orientadora',
    email: 'ana@ufba.br',
    role,
    status: 'ACTIVE',
    tax_id: null,
    phone_number: null,
    link_to_lattes: null,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
}

function renderDialog(role: UserRole) {
  const onConfirm = jest.fn()
  const onClose = jest.fn()
  const item = advisor(role)

  render(
    <DialogPerfilAdministrador
      item={item}
      isOpen
      onClose={onClose}
      onConfirm={onConfirm}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: 'Sim' }))

  return { item, onConfirm, onClose }
}

describe('DialogPerfilAdministrador', () => {
  it('quando o orientador não é administrador, pede para habilitar', () => {
    const { item, onConfirm, onClose } = renderDialog('ADVISOR')

    expect(
      screen.getByRole('heading', { name: 'Habilitar perfil de administrador' })
    ).toBeInTheDocument()
    expect(onConfirm).toHaveBeenCalledWith(item, true)
    expect(onClose).toHaveBeenCalled()
  })

  it('quando o orientador já é administrador, pede para desabilitar', () => {
    const { item, onConfirm } = renderDialog('ADVISOR_WITH_ADMIN_PRIVILEGES')

    expect(onConfirm).toHaveBeenCalledWith(item, false)
  })
})
