import { render, screen } from '@testing-library/react'
import { MdPieChart } from 'react-icons/md'
import { ChartCard } from './chart-card'

describe('ChartCard', () => {
  it('mostra título, subtítulo e o gráfico', () => {
    render(
      <ChartCard title='Mestrado' subtitle='Ativas · 3 bolsas' icon={MdPieChart}>
        <div>gráfico</div>
      </ChartCard>
    )

    expect(screen.getByRole('heading', { name: 'Mestrado' })).toBeInTheDocument()
    expect(screen.getByText('Ativas · 3 bolsas')).toBeInTheDocument()
    expect(screen.getByText('gráfico')).toBeInTheDocument()
  })

  it('mostra o skeleton no lugar do gráfico enquanto carrega', () => {
    render(
      <ChartCard title='Histórico' icon={MdPieChart} isLoading>
        <div>gráfico</div>
      </ChartCard>
    )

    expect(screen.getByRole('status', { name: 'Carregando gráfico' })).toBeInTheDocument()
    expect(screen.queryByText('gráfico')).not.toBeInTheDocument()
  })
})
