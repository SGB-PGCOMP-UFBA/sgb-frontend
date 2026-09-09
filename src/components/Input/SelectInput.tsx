import type { FilterOption } from '../../types'

export interface SelectInputProps {
  id: string
  label: string
  name: string
  /** Valor corrente; casa com o `key` de uma das opcoes. */
  selected: string
  options: FilterOption[]
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectInput(props: SelectInputProps) {
  const { id, label, name, selected, options, handleChange } = props

  const handleChangeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e)
  }

  return (
    <div className="flex w-full flex-col gap-y-1.5 text-base font-medium leading-7 text-gray-800">
      <label htmlFor={name} className="text-base font-medium leading-7 text-gray-800">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={selected}
        onChange={handleChangeInput}
        className="placeholder-gray-400::placeholder w-full rounded-lg border border-gray-400 px-4 py-3 text-left text-base font-normal
          leading-6 text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  )
}
