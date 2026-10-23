import { act, fireEvent, render, screen } from '@testing-library/react'
import { useFormChanges } from './use-form-changes'

function Form({ onSave }: { onSave: (changed: boolean) => void }) {
  const { formProps, hasChanges, resetChanges } = useFormChanges()

  return (
    <form
      {...formProps}
      aria-label='form'
      onSubmit={event => {
        event.preventDefault()
        const changed = hasChanges(event.currentTarget)
        onSave(changed)
        if (changed) resetChanges(event.currentTarget)
      }}
    >
      <label htmlFor='name'>Nome</label>
      <input id='name' name='name' defaultValue='Ana' />
      <button type='submit'>Salvar</button>
    </form>
  )
}

function renderForm() {
  jest.useFakeTimers()
  const onSave = jest.fn()
  render(<Form onSave={onSave} />)
  act(() => {
    jest.runOnlyPendingTimers()
  })
  return onSave
}

describe('useFormChanges', () => {
  afterEach(() => jest.useRealTimers())

  it('sem mudança, informa que nada mudou', () => {
    const onSave = renderForm()

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenLastCalledWith(false)
  })

  it('com um campo alterado, informa a mudança', () => {
    const onSave = renderForm()

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Ana Maria' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenLastCalledWith(true)
  })

  it('espaços nas pontas não contam como mudança', () => {
    const onSave = renderForm()

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: '  Ana ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenLastCalledWith(false)
  })

  it('voltar ao valor original não conta como mudança', () => {
    const onSave = renderForm()
    const input = screen.getByLabelText('Nome')

    fireEvent.change(input, { target: { value: 'Bia' } })
    fireEvent.change(input, { target: { value: 'Ana' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenLastCalledWith(false)
  })

  it('depois de salvar, compara com o que foi salvo', () => {
    const onSave = renderForm()
    const input = screen.getByLabelText('Nome')

    fireEvent.change(input, { target: { value: 'Bia' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave.mock.calls).toEqual([[true], [false]])
  })

  it('se o usuário mexer antes do retrato inicial, compara com o valor de antes', () => {
    jest.useFakeTimers()
    const onSave = jest.fn()
    render(<Form onSave={onSave} />)
    const input = screen.getByLabelText('Nome')

    fireEvent.keyDown(input, { key: 'a' })
    fireEvent.change(input, { target: { value: 'Ana Maria' } })
    act(() => {
      jest.runOnlyPendingTimers()
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenLastCalledWith(true)
  })
})
