import { fireEvent, render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AvisoDuracaoBolsa } from './aviso-duracao-bolsa'

const LONGER =
  'Duração acima dos 2 anos esperados para mestrado (término esperado em 29/02/2028).'

function renderAviso(props: Partial<Parameters<typeof AvisoDuracaoBolsa>[0]>) {
  return render(
    <TooltipProvider>
      <AvisoDuracaoBolsa
        startsAt='2026-03-01'
        endsAt='2028-06-01'
        program='MESTRADO'
        {...props}
      />
    </TooltipProvider>
  )
}

describe('AvisoDuracaoBolsa', () => {
  it('mostra a mensagem direto, com o icone', () => {
    renderAviso({})

    expect(screen.getByRole('status')).toHaveTextContent(LONGER)
    expect(screen.getByRole('status').querySelector('svg')).not.toBeNull()
  })

  it.each([
    ['a duracao exata', '2028-02-29'],
    ['duracao mais curta', '2027-06-01'],
  ])('com %s, nao mostra nada', (_, endsAt) => {
    const { container } = renderAviso({ endsAt })

    expect(container).toBeEmptyDOMElement()
  })

  it('como icone, so mostra a mensagem no tooltip', async () => {
    renderAviso({ variant: 'icon' })

    const trigger = screen.getByRole('button', { name: LONGER })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    fireEvent.focus(trigger)

    expect(await screen.findByRole('tooltip')).toHaveTextContent(LONGER)
  })

  it('como icone com a duracao exata, nao mostra o icone', () => {
    renderAviso({ variant: 'icon', endsAt: '2028-02-29' })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
