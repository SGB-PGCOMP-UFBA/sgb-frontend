import * as React from 'react'
import PropTypes from 'prop-types'
import { IMaskInput } from 'react-imask'

const PhoneInputMask = React.forwardRef(function PhoneInputMask(props, ref) {
  const { onChange, ...other } = props

  return (
    <IMaskInput
      {...other}
      mask="(##) # ####-####"
      definitions={{
        '#': /\d/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

PhoneInputMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { PhoneInputMask }
