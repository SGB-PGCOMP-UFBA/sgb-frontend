import { useCallback, useRef } from 'react'
import { snapshotForm } from '@/helpers/form-values.helper'

/**
 * Detecta se o usuario mudou algum campo antes de enviar o formulario, para
 * nao chamar a API (nem mostrar toast) quando nada mudou.
 *
 * O retrato inicial e tirado depois da montagem, num `setTimeout`, porque
 * alguns campos (o Select do Radix, por exemplo) so preenchem o valor do
 * input nativo depois dos efeitos. Se o usuario interagir antes disso, o
 * retrato e tirado nessa primeira interacao, ainda sem a mudanca.
 */
export function useFormChanges() {
  const baseline = useRef<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const takeSnapshot = useCallback((form: HTMLFormElement) => {
    if (baseline.current === null) baseline.current = snapshotForm(form)
  }, [])

  const formRef = useCallback(
    (form: HTMLFormElement | null) => {
      clearTimeout(timer.current)
      baseline.current = null
      if (form) timer.current = setTimeout(() => takeSnapshot(form), 0)
    },
    [takeSnapshot]
  )

  /**
   * Primeira tecla ou clique do usuario. Foco nao serve: o dialogo foca o
   * primeiro campo sozinho, antes de os campos terminarem de montar.
   */
  const onFirstInteraction = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) =>
      takeSnapshot(event.currentTarget),
    [takeSnapshot]
  )

  /** Sem retrato (formulario sem campos com `name`), considera que mudou. */
  const hasChanges = useCallback((form: HTMLFormElement) => {
    if (baseline.current === null) return true
    return snapshotForm(form) !== baseline.current
  }, [])

  /** Depois de salvar num formulario que continua aberto. */
  const resetChanges = useCallback((form: HTMLFormElement) => {
    baseline.current = snapshotForm(form)
  }, [])

  const formProps = {
    ref: formRef,
    onPointerDownCapture: onFirstInteraction,
    onKeyDownCapture: onFirstInteraction,
  }

  return { formProps, hasChanges, resetChanges }
}
