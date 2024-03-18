import React from 'react'

export default function SelectInput(props) {
  const { id, label, name, options, handleChange, formValues } = props

  const handleChangeInput = (e) => {
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
        defaultValue={formValues.role}
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
