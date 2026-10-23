import { act, fireEvent, render, screen, within } from '@testing-library/react'
import {
  FormularioBolsa,
  type ScholarshipFormOptions,
} from './formulario-bolsa'
import type { AdvisorDetailed, ScholarshipDetailedWithRelations } from '@/types'

function advisor(
  id: number,
  name: string,
  status: AdvisorDetailed['status']
): AdvisorDetailed {
  return {
    id,
    name,
    status,
    email: `${name.split(' ')[0].toLowerCase()}@ufba.br`,
    role: 'ADVISOR',
    tax_id: null,
    phone_number: null,
    enrollmentsCount: 0,
    has_admin_privileges: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
}

const scholarship = {
  id: 3,
  status: 'ON_GOING',
  scholarship_starts_at: '2026-07-15',
  scholarship_ends_at: '2027-05-11',
  extension_ends_at: null,
  salary: 2100,
  agency: { id: 1, name: 'CAPES' },
  allocation: null,
  enrollment: {
    id: 12,
    enrollment_number: '2024000003',
    enrollment_program: 'MESTRADO',
    enrollment_date: '2024-03-01',
    defense_prediction_date: null,
  },
  student: { id: 9, name: 'Igor Estudante', email: 'igor@ufba.br' },
  advisor: { id: 6, name: 'Bia Inativa', email: 'bia@ufba.br' },
} as unknown as ScholarshipDetailedWithRelations

const options: ScholarshipFormOptions = {
  agencies: [{ id: 1, key: 'CAPES', value: 'CAPES' }],
  allocations: [{ id: 2, key: 'REMOTO', value: 'REMOTO' }],
  advisors: [
    advisor(4, 'Ana Orientadora', 'ACTIVE'),
    advisor(5, 'Caio Orientador', 'ACTIVE'),
    advisor(6, 'Bia Inativa', 'INACTIVE'),
    advisor(7, 'Davi Inativo', 'INACTIVE'),
  ],
  isLoading: false,
}

function renderForm(overrides: Partial<ScholarshipFormOptions> = {}) {
  const onCancel = jest.fn()
  const onSubmit = jest.fn().mockResolvedValue(true)

  render(
    <FormularioBolsa
      scholarship={scholarship}
      options={{ ...options, ...overrides }}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )

  return { onCancel, onSubmit }
}

/** O Select do Radix espelha as opções num `<select>` nativo escondido. */
function nativeOptions(name: string) {
  const form = screen.getByRole('form', { name: 'Editar bolsa' })
  const select = form.querySelector(`select[name="${name}"]`) as HTMLElement

  return within(select)
    .getAllByRole('option', { hidden: true })
    .map(option => option.textContent)
    .filter(Boolean)
}

describe('FormularioBolsa', () => {
  it('lista os orientadores ativos e mantém o atual mesmo inativo', () => {
    renderForm()

    expect(nativeOptions('advisor_email')).toEqual([
      'Ana Orientadora',
      'Bia Inativa (inativo)',
      'Caio Orientador',
    ])
  })

  it('mostra o bolsista sem permitir trocar', () => {
    renderForm()

    expect(screen.getByText('Igor Estudante')).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: /bolsista/i })
    ).not.toBeInTheDocument()
  })

  it('enquanto carrega as opções, não mostra o formulário', () => {
    renderForm({ isLoading: true })

    expect(screen.getByRole('status')).toHaveTextContent(
      'Carregando opções de edição'
    )
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  describe('ao salvar', () => {
    beforeEach(() => jest.useFakeTimers())
    afterEach(() => jest.useRealTimers())

    function settle() {
      act(() => {
        jest.runOnlyPendingTimers()
      })
    }

    it('sem mudança, só fecha a edição sem chamar a API', () => {
      const { onCancel, onSubmit } = renderForm()
      settle()

      fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

      expect(onSubmit).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalled()
    })

    it('com mudança, envia os valores', async () => {
      const { onSubmit } = renderForm()
      settle()

      const salary = screen.getByLabelText('Valor')
      fireEvent.keyDown(salary, { key: '5' })
      fireEvent.change(salary, { target: { value: 'R$ 2.500' } })
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
      })

      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ salary: 'R$ 2.500' })
      )
    })
  })
})
