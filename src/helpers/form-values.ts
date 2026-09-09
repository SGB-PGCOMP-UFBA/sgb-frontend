/**
 * Le os campos de um formulario como um objeto tipado.
 *
 * `FormData.entries()` devolve `string | File`, mas nenhum formulario que passa
 * por aqui tem input de arquivo (o upload de CSV usa `FileInput`), logo todo
 * valor lido e string. Campos `disabled` nao entram no FormData: declare-os
 * opcionais na interface do formulario.
 */
export function readFormValues<T>(form: FormData): T {
  return Object.fromEntries(form.entries()) as T
}
