import { fireEvent, render, screen } from '@testing-library/react'
import { ResumoBolsasUsuario } from './resumo-bolsas-usuario'
import type { ScholarshipSummary } from '@/types'

const scholarship = (
  id: number,
  status: ScholarshipSummary['status']
): ScholarshipSummary => ({
  id,
  status,
  scholarship_starts_at: '2024-03-01',
  scholarship_ends_at: '2026-02-28',
  extension_ends_at: null,
  agency_name: 'CAPES',
  allocation_name: null,
  enrollment_number: '2024000001',
  enrollment_program: 'MESTRADO',
  student: { id: 7, name: 'Maria Souza' },
  advisor: { id: 8, name: 'Ana' },
})

describe('ResumoBolsasUsuario', () => {
  it('mostra o total, quantas estão ativas e leva à página de bolsas', () => {
    const onViewScholarships = jest.fn()
    render(
      <ResumoBolsasUsuario
        scholarships={[
          scholarship(1, 'ON_GOING'),
          scholarship(2, 'EXTENDED'),
          scholarship(3, 'FINISHED'),
        ]}
        isLoading={false}
        hasError={false}
        onViewScholarships={onViewScholarships}
      />
    )

    expect(screen.getByText('3 bolsas')).toBeInTheDocument()
    expect(screen.getByText('2 ativas · 1 finalizada')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Visualizar bolsas' }))
    expect(onViewScholarships).toHaveBeenCalled()
  })

  it('sem bolsas, não mostra o botão', () => {
    render(
      <ResumoBolsasUsuario
        scholarships={[]}
        isLoading={false}
        hasError={false}
        onViewScholarships={jest.fn()}
      />
    )

    expect(screen.getByText('0 bolsas')).toBeInTheDocument()
    expect(
      screen.getByText('Nenhuma bolsa vinculada a este usuário.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
