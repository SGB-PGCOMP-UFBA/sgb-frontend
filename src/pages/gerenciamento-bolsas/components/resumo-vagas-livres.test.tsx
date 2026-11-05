import { render, screen } from '@testing-library/react'
import { ResumoVagasLivres } from './resumo-vagas-livres'
import type { AgencyDetailed } from '@/types'

const AGENCIES = [
  {
    id: 1,
    name: 'CAPES',
    masters_degree_awarded_scholarships: 10,
    masters_degree_allocated_scholarships: 7,
    doctorate_degree_awarded_scholarships: 4,
    doctorate_degree_allocated_scholarships: 3,
  },
  {
    id: 2,
    name: 'CNPq',
    masters_degree_awarded_scholarships: 2,
    masters_degree_allocated_scholarships: 2,
    doctorate_degree_awarded_scholarships: 1,
    doctorate_degree_allocated_scholarships: 0,
  },
] as AgencyDetailed[]

describe('ResumoVagasLivres', () => {
  it('sem agência no filtro, não mostra nada', () => {
    const { container } = render(
      <ResumoVagasLivres agencies={AGENCIES} agencyName='ALL' programName='ALL' />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('com agência e sem curso, mostra mestrado e doutorado da agência filtrada', () => {
    render(
      <ResumoVagasLivres agencies={AGENCIES} agencyName='CNPq' programName='ALL' />
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      'Vagas livres na CNPq: 0 de mestrado · 1 de doutorado'
    )
  })

  it('com curso no filtro, mostra só esse curso', () => {
    render(
      <ResumoVagasLivres
        agencies={AGENCIES}
        agencyName='CAPES'
        programName='DOUTORADO'
      />
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      'Vagas livres na CAPES: 1 de doutorado'
    )
    expect(screen.getByRole('status')).not.toHaveTextContent('mestrado')
  })

  it('enquanto as agências não carregam, não mostra nada', () => {
    const { container } = render(
      <ResumoVagasLivres agencies={[]} agencyName='CAPES' programName='ALL' />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
