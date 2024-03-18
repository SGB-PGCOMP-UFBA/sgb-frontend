import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export default function PasswordInput(props) {
  const { label, value, name, placeholder, handleChange, inputRef, patternErro, pattern, error } =
    props
  const [visiblity, setVisiblity] = useState(false)

  const input = useRef(inputRef ?? null)

  const handleVisiblity = () => {
    setVisiblity(!visiblity)
  }

  const handleChangeInput = (e) => {
    handleChange(e)
  }

  return (
    <div className="relative flex w-full flex-col gap-y-1.5 text-base font-medium leading-7 text-gray-800">
      <label
        htmlFor={name}
        className="flex flex-col gap-y-1.5 text-base font-medium leading-7 text-gray-800"
      >
        {label}
      </label>
      <input
        id={name}
        type={visiblity ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChangeInput}
        ref={input}
        pattern={pattern}
        title={pattern ? patternErro : ''}
        className="placeholder-gray-400::placeholder w-full rounded-lg border border-gray-400 py-3 pl-4 pr-11 text-base font-normal leading-6 text-gray-800
          focus:outline-none focus:ring-1 focus:ring-sky-500"
      />
      <button
        className="absolute right-4 top-12"
        onClick={handleVisiblity}
        type="button"
        aria-label="exibir ou ocultar senha"
      >
        <img
          src={`/assets/icons/${visiblity ? 'eyes-close.svg' : 'eye.svg'}`}
          alt="Eye Icon"
          width={24}
          height={24}
        />
      </button>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string
}

PasswordInput.defaultProps = {
  error: ''
}
