import type { ScholarshipStatus } from '../types'

/**
 * Rotulos em portugues para os status de bolsa.
 *
 * Nao confundir com o `StatusEnum` do backend: la, EXTENDED e
 * "Em andamento (prorrogado)".
 */
export const StatusEnum: Record<ScholarshipStatus, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  FINISHED: 'Finalizado',
  ON_GOING: 'Em andamento',
  EXTENDED: 'Prorrogado'
}
