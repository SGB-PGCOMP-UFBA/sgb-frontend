import React, { useRef } from 'react'
import PropTypes from 'prop-types'

export default function FormInput(props) {
  const {
    label,
    type,
    value,
    name,
    placeholder,
    handleChange,
    inputRef,
    patternErro,
    pattern,
    error,
    id
  } = props
  const input = useRef(inputRef ?? null)

  const handleChangeInput = (e) => {
    handleChange(e)
  }

  return (
    <div className="flex w-full flex-col gap-y-1.5 text-base font-medium leading-7 text-gray-800">
      <label htmlFor={name} className="text-base font-medium leading-7 text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        name={name}
        ref={input}
        onChange={handleChangeInput}
        pattern={pattern}
        title={pattern ? patternErro : ''}
        className="placeholder-gray-400::placeholder w-full rounded-lg border border-gray-400 px-4 py-3 text-left text-base font-normal
          leading-6 text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

FormInput.prototypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  patternError: PropTypes.string.isRequired,
  error: PropTypes.string
}

FormInput.defaultProps = {
  error: ''
}
