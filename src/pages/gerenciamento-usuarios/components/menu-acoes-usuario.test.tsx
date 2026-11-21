import { fireEvent, render, screen } from '@testing-library/react'
import { MenuAcoesUsuario } from './menu-acoes-usuario'
import type { ManagedUser, UserRole } from '@/types'

function user(role: UserRole): ManagedUser {
  return {
    id: 7,
    name: 'Ana Souza',
    email: 'ana@ufba.br',
    role,
    status: role === 'STUDENT' ? null : 'ACTIVE',
    tax_id: null,
    phone_number: null,
    link_to_lattes: null,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
}

function openMenu(role: UserRole) {
  const handlers = {
    onView: jest.fn(),
    onEdit: jest.fn(),
    onToggleStatus: jest.fn(),
    onToggleAdminPrivileges: jest.fn(),
    onDelete: jest.fn(),
  }
  render(<MenuAcoesUsuario user={user(role)} {...handlers} />)
  fireEvent.keyDown(
    screen.getByRole('button', { name: 'Ações para Ana Souza' }),
    { key: 'Enter' }
  )
  return handlers
}

describe('MenuAcoesUsuario', () => {
  it('para orientador, oferece habilitar o perfil de administrador', () => {
    const { onToggleAdminPrivileges } = openMenu('ADVISOR')

    fireEvent.click(
      screen.getByRole('menuitem', {
        name: 'Habilitar perfil de administrador',
      })
    )

    expect(onToggleAdminPrivileges).toHaveBeenCalledWith(
      expect.objectContaining({ id: 7 })
    )
  })

  it('para orientador administrador, oferece desabilitar', () => {
    openMenu('ADVISOR_WITH_ADMIN_PRIVILEGES')

    expect(
      screen.getByRole('menuitem', {
        name: 'Desabilitar perfil de administrador',
      })
    ).toBeInTheDocument()
  })

  it.each([['STUDENT'], ['ADMIN']] as const)(
    'para %s, não mostra a ação de perfil de administrador',
    role => {
      openMenu(role)

      expect(
        screen.queryByRole('menuitem', { name: /perfil de administrador/ })
      ).not.toBeInTheDocument()
    }
  )
})
