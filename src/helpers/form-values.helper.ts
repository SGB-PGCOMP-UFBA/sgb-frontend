/**
 * Le os campos de um formulario como um objeto tipado.
 *
 * `FormData.entries()` devolve `string | File`, mas nenhum formulario que passa
 * por aqui tem input de arquivo, logo todo
 * valor lido e string. Campos `disabled` nao entram no FormData: declare-os
 * opcionais na interface do formulario.
 */
export function readFormValues<T>(form: FormData): T {
  return Object.fromEntries(form.entries()) as T
}

/**
 * Retrato dos campos de um formulario, para saber se algo mudou entre a
 * abertura e o envio. Espacos nas pontas nao contam como mudanca. Devolve
 * `null` quando o formulario nao tem campos com `name`, ja que ai nao da
 * para comparar.
 */
export function snapshotForm(form: HTMLFormElement): string | null {
  const entries = Array.from(new FormData(form).entries()).map(
    ([name, value]) =>
      [name, typeof value === 'string' ? value.trim() : value.name] as const
  )

  return entries.length > 0 ? JSON.stringify(entries) : null
}
