import PropTypes from 'prop-types'
import React from 'react'
import { Chip } from '@mui/material'
import './styles.css'

export default function CustomChip(props) {
  const { type, value } = props

  const getClassName = () => {
    const key = `${type}-${value}`.toLowerCase()

    switch (key) {
      case 'agency-cnpq':
        return 'custom-chip-cnpq'
      case 'agency-capes':
        return 'custom-chip-capes'
      case 'agency-fapesb':
        return 'custom-chip-fapesb'
      case 'program-doutorado':
        return 'custom-chip-doutorado'
      case 'program-mestrado':
        return 'custom-chip-mestrado'
      case 'status-ativa':
        return 'custom-chip-ativo'
      case 'status-inativa':
        return 'custom-chip-inativo'
      default:
        return 'custom-chip-default'
    }
  }

  let className = getClassName()
  className += ' overflow-auto'

  return (
    <Chip
      label={value.toUpperCase()}
      className={className}
      style={{
        borderRadius: '0.4rem'
      }}
    />
  )
}

CustomChip.prototypes = {
  type: PropTypes.oneOf(['agency, program, status']),
  value: PropTypes.string
}
