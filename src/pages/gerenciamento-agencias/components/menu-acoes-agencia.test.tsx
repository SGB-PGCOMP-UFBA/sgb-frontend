import { fireEvent, render, screen } from '@testing-library/react'
import { AGENCY_DELETE_BLOCKED } from '@/helpers/linked-scholarships.helper'
import { MenuAcoesAgencia } from './menu-acoes-agencia'
import type { AgencyDetailed } from '@/types'

function agency(allocated: number): AgencyDetailed {
  return {
    id: 3,
    name: 'CAPES',
    description: 'Coordenação',
    scholarshipsSinceBeginning: allocated,
    masters_degree_awarded_scholarships: 5,
    masters_degree_allocated_scholarships: allocated,
    doctorate_degree_awarded_scholarships: 2,
    doctorate_degree_allocated_scholarships: 0,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
}

function openMenu(allocated: number) {
  const handlers = { onView: jest.fn(), onEdit: jest.fn(), onDelete: jest.fn() }
  render(<MenuAcoesAgencia agency={agency(allocated)} {...handlers} />)
  fireEvent.keyDown(screen.getByRole('button', { name: 'Ações para CAPES' }), {
    key: 'Enter',
  })
  return handlers
}

describe('MenuAcoesAgencia', () => {
  it('leva aos detalhes e à edição da agência', () => {
    const { onView } = openMenu(0)

    fireEvent.click(screen.getByRole('menuitem', { name: 'Ver detalhes' }))

    expect(onView).toHaveBeenCalledWith(expect.objectContaining({ id: 3 }))
  })

  it('sem bolsas vinculadas, deixa excluir', () => {
    openMenu(0)

    expect(screen.getByRole('menuitem', { name: 'Excluir' })).not.toHaveAttribute(
      'aria-disabled'
    )
  })

  it('com bolsas vinculadas, bloqueia a exclusão e diz o motivo', () => {
    openMenu(1)

    const item = screen.getByRole('menuitem', { name: /Excluir/ })
    expect(item).toHaveAttribute('aria-disabled', 'true')
    expect(item).toHaveTextContent(AGENCY_DELETE_BLOCKED)
  })
})
