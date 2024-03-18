import React from 'react'
import PropTypes from 'prop-types'
import { SelectInput } from '../../../components'

function IdentificationForm(props) {
  const { formValues, onFormValueChange } = props

  const options = [
    {
      key: 'STUDENT',
      value: 'Sou um estudante'
    },
    {
      key: 'ADVISOR',
      value: 'Sou um orientador'
    },
    {
      key: 'ADMIN',
      value: 'Sou um administrador do sistema'
    }
  ]

  return (
    <form className="flex w-full flex-col gap-y-5 font-inter">
      <SelectInput
        name="role"
        label="Quem é você?"
        options={options}
        formValues={formValues}
        handleChange={onFormValueChange}
      />
    </form>
  )
}

IdentificationForm.prototypes = {
  formValues: PropTypes.node,
  onFormValueChange: PropTypes.node
}

export { IdentificationForm }
