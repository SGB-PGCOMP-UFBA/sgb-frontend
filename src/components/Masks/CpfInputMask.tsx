import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

/**
 * As mascaras devolvem um evento sintetico no formato que os formularios do
 * projeto esperam (`e.target.name` / `e.target.value`), e nao um ChangeEvent
 * real do DOM.
 */
export interface MaskChangeEvent {
  target: { name: string; value: string }
}

export interface MaskInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'max' | 'min' | 'type'
  > {
  name: string
  value?: string
  onChange: (event: MaskChangeEvent) => void
}

const CpfInputMask = forwardRef<HTMLInputElement, MaskInputProps>(
  function CpfInputMask(props, ref) {
    const { onChange, ...other } = props

    return (
      <IMaskInput
        {...other}
        mask="###.###.###-##"
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

export { CpfInputMask }
