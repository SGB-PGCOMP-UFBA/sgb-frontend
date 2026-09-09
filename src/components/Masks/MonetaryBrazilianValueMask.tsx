import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

/** Diferente das demais mascaras, esta entrega o valor ja como number. */
export interface MonetaryChangeEvent {
  target: { name: string; value: number }
}

export interface MonetaryBrazilianValueMaskProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'max' | 'min' | 'type'
  > {
  name: string
  value?: string | number
  onChange: (event: MonetaryChangeEvent) => void
}

const MonetaryBrazilianValueMask = forwardRef<
  HTMLInputElement,
  MonetaryBrazilianValueMaskProps
>(function MonetaryBrazilianValueMask(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: Number(
              values.value.replace(/[^\d,]/g, '').replace(',', '.')
            )
          },
        })
      }}
      prefix="R$ "
      thousandSeparator="."
      decimalSeparator=","
    />
  )
})

export default MonetaryBrazilianValueMask
