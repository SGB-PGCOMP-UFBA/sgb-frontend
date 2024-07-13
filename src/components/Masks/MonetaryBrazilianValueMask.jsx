import { NumericFormat } from 'react-number-format'
import React from 'react'

const MonetaryBrazilianValueMask = React.forwardRef(function MonetaryBrazilianValueMask(props, ref) {
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
            value: Number(values.value.replace(/[^\d,]/g, '').replace(',', '.'))
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
