import { IMaskInput } from 'react-imask'
import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/utils'
import { inputClassName } from './input'

export interface MaskedInputProps {
  name: string
  onChange?: (event: { target: { name: string; value: string } }) => void
  id?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  className?: string
}

function CpfInput({ name, onChange, className, ...props }: MaskedInputProps) {
  return (
    <IMaskInput
      {...props}
      name={name}
      mask="###.###.###-##"
      definitions={{ '#': /\d/ }}
      onAccept={(value: string) => onChange?.({ target: { name, value } })}
      overwrite
      className={cn(inputClassName, className)}
    />
  )
}

function PhoneInput({ name, onChange, className, ...props }: MaskedInputProps) {
  return (
    <IMaskInput
      {...props}
      name={name}
      mask="(##) # ####-####"
      definitions={{ '#': /\d/ }}
      onAccept={(value: string) => onChange?.({ target: { name, value } })}
      overwrite
      className={cn(inputClassName, className)}
    />
  )
}

export interface MonetaryInputProps
  extends Omit<MaskedInputProps, 'onChange' | 'value' | 'defaultValue'> {
  value?: string | number
  defaultValue?: string | number
  onChange?: (event: { target: { name: string; value: number } }) => void
}

function MonetaryInput({
  name,
  onChange,
  className,
  ...props
}: MonetaryInputProps) {
  return (
    <NumericFormat
      {...props}
      name={name}
      allowNegative={false}
      onValueChange={(values) => {
        onChange?.({
          target: {
            name,
            value: Number(values.value.replace(/[^\d,]/g, '').replace(',', '.'))
          }
        })
      }}
      prefix="R$ "
      thousandSeparator="."
      decimalSeparator=","
      className={cn(inputClassName, className)}
    />
  )
}

export { CpfInput, PhoneInput, MonetaryInput }
