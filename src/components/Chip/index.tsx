import { Chip } from '@mui/material'
import { StatusEnum } from '../../constants/Status'
import type { ScholarshipStatus } from '../../types'
import './styles.css'

export type CustomChipType = 'agency' | 'program' | 'status'

export interface CustomChipProps {
  type: CustomChipType
  value: string
}

export default function CustomChip(props: CustomChipProps) {
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
        return 'custom-chip-prorrogated'
      case 'status-finished':
        return 'custom-chip-finished'
      default:
        return 'custom-chip-default'
    }
  }

  const getLabel = () => {
    if (type === 'status') {
      const label = StatusEnum[value as ScholarshipStatus]
      return (label ?? value).toUpperCase()
    }

    return value.toUpperCase()
  }

  const className = `${getClassName()} overflow-auto w-full`

  return (
    <Chip
      label={getLabel()}
      className={className}
      style={{
        borderRadius: '0.4rem',
      }}
    />
  )
}
