import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import type { MaskInputProps } from './CpfInputMask'

const PhoneInputMask = forwardRef<HTMLInputElement, MaskInputProps>(
  function PhoneInputMask(props, ref) {
    const { onChange, ...other } = props

    return (
      <IMaskInput
        {...other}
        mask="(##) # ####-####"
        definitions={{
          '#': /\d/
        }}
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  }
)

export { PhoneInputMask }
