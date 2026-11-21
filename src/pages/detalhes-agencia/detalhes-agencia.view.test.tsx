import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { DetalhesAgenciaView } from './detalhes-agencia.view'
import type { AgencyDetailed } from '@/types'

jest.mock('@/components/app-layout', () => {
  const { TooltipProvider } = jest.requireActual('@/components/ui/tooltip')
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <TooltipProvider>{children}</TooltipProvider>
    ),
  }
})

const AGENCY: AgencyDetailed = {
  id: 3,
  name: 'CAPES',
  description: 'Coordenação de Aperfeiçoamento',
  scholarshipsSinceBeginning: 0,
  masters_degree_awarded_scholarships: 5,
  masters_degree_allocated_scholarships: 0,
  doctorate_degree_awarded_scholarships: 2,
  doctorate_degree_allocated_scholarships: 0,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
}

function renderView(
  props: Partial<React.ComponentProps<typeof DetalhesAgenciaView>> = {}
) {
  const handlers = {
    onBack: jest.fn(),
    onUpdate: jest.fn().mockResolvedValue(true),
    onDelete: jest.fn(),
  }
  render(
    <DetalhesAgenciaView
      isLoading={false}
      agency={AGENCY}
      {...handlers}
      {...props}
    />
  )
  return handlers
}

describe('DetalhesAgenciaView', () => {
  it('mostra os dados e as vagas da agência', () => {
    renderView()

    expect(screen.getByRole('heading', { name: 'CAPES' })).toBeInTheDocument()
    expect(
      screen.getByText('Coordenação de Aperfeiçoamento')
    ).toBeInTheDocument()
    expect(screen.getByText('Concedidas para o mestrado')).toBeInTheDocument()
  })

  it('quando a listagem pede edição, abre direto no formulário e salva', async () => {
    const { onUpdate } = renderView({ startEditing: true })

    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Nova descrição' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    await waitFor(() =>
      expect(onUpdate).toHaveBeenCalledWith({
        description: 'Nova descrição',
        masters_degree_awarded_scholarships: 5,
        doctorate_degree_awarded_scholarships: 2,
      })
    )
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Salvar' })).not.toBeInTheDocument()
    )
  })

  it('com bolsas vinculadas, o botão de excluir fica bloqueado', () => {
    const { onDelete } = renderView({
      agency: { ...AGENCY, scholarshipsSinceBeginning: 1 },
    })

    const button = screen.getByRole('button', { name: 'Excluir' })
    expect(button).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(button)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('quando a agência não existe, avisa e oferece voltar', () => {
    const { onBack } = renderView({ agency: null })

    expect(screen.getByText('Agência não encontrada.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Voltar para agências/ }))
    expect(onBack).toHaveBeenCalled()
  })
})
