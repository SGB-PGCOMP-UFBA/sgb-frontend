/** Id da rota `/:id`; `null` quando não é um inteiro positivo. */
export function readRouteId(param: string | undefined): number | null {
  const id = Number(param)
  return Number.isInteger(id) && id > 0 ? id : null
}

/** As listagens mandam `startEditing` no state ao escolher "Editar". */
export function readStartEditing(state: unknown): boolean {
  return Boolean((state as { startEditing?: boolean } | null)?.startEditing)
}
