import * as React from 'react'
import PropTypes from 'prop-types'
import { IMaskInput } from 'react-imask'

const CpfInputMask = React.forwardRef(function CpfInputMask(props, ref) {
  const { onChange, ...other } = props

  return (
    <IMaskInput
      {...other}
      mask="###.###.###-##"
      definitions={{
        '#': /\d/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

CpfInputMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export { CpfInputMask }
