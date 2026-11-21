import { fireEvent, render, screen, within } from '@testing-library/react'
import { ONGOING_SCHOLARSHIP_BLOCKED } from '@/helpers/student-records.helper'
import { DetalhesMatriculaView } from './detalhes-matricula.view'
import type { EnrollmentDetailedWithFullRelations } from '@/types'

jest.mock('@/components/app-layout', () => {
  const { TooltipProvider } = jest.requireActual('@/components/ui/tooltip')
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <TooltipProvider>{children}</TooltipProvider>
    ),
  }
})

const ENROLLMENT = {
  id: 40,
  enrollment_number: ' 2024000001 ',
  enrollment_program: 'MESTRADO',
  enrollment_date: '2024-03-01',
  defense_prediction_date: '2026-02-28',
  advisor: null,
  scholarships: [
    {
      id: 90,
      status: 'ON_GOING',
      scholarship_starts_at: '2024-03-01',
      scholarship_ends_at: '2026-02-28',
      extension_ends_at: null,
      salary: 2100,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      agency: { id: 3, name: 'CAPES' },
      allocation: null,
    },
  ],
} as unknown as EnrollmentDetailedWithFullRelations

function renderView(
  props: Partial<React.ComponentProps<typeof DetalhesMatriculaView>> = {}
) {
  const handlers = {
    onBack: jest.fn(),
    onUpdate: jest.fn().mockResolvedValue(true),
    onCreateScholarship: jest.fn(),
    onViewScholarship: jest.fn(),
    onDelete: jest.fn(),
  }
  render(
    <DetalhesMatriculaView
      isLoading={false}
      enrollment={ENROLLMENT}
      advisors={[]}
      agencies={[]}
      allocations={[]}
      {...handlers}
      {...props}
    />
  )
  return handlers
}

describe('DetalhesMatriculaView', () => {
  it('mostra a matrícula e leva à bolsa vinculada', () => {
    const { onViewScholarship } = renderView()

    expect(
      screen.getByRole('heading', { name: 'Matrícula 2024000001' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Matrícula sem orientador vinculado.')
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ver bolsa CAPES' }))
    expect(onViewScholarship).toHaveBeenCalledWith(90)
  })

  it('com bolsa em andamento, bloqueia a inclusão de outra', () => {
    renderView({ addScholarshipDisabledReason: ONGOING_SCHOLARSHIP_BLOCKED })

    const button = screen.getByRole('button', { name: 'Adicionar bolsa' })
    expect(button).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(button)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('pede confirmação antes de excluir', () => {
    const { onDelete } = renderView()

    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Excluir',
      })
    )

    expect(onDelete).toHaveBeenCalledWith(40)
  })
})
