import PropTypes from 'prop-types'
import React from 'react'
import { Chip } from '@mui/material'
import { StatusEnum } from '../../constants/Status'
import './styles.css'

export default function CustomChip(props) {
  const { type, value } = props

  const getClassName = () => {
    const key = `${type}-${value}`.toLowerCase()

    switch (key) {
      case 'agency-outras':
        return 'custom-chip-outras'
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
      case 'status-active':
        return 'custom-chip-ativo'
      case 'status-inactive':
        return 'custom-chip-inativo'
      case 'status-on_going':
          return 'custom-chip-ativo'
      case 'status-extended':
            return 'custom-chip-ativo'
      case 'status-finished':
          return 'custom-chip-inativo'
      default:
        return 'custom-chip-default'
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'status':
        return StatusEnum[value].toUpperCase()
      default:
        return value.toUpperCase()
    }
  }

  let className = getClassName()
  className += ' overflow-auto w-full'

  let label = getLabel()

  return (
    <Chip
      label={label}
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
