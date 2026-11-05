import { useLayoutEffect, useState, type RefObject } from 'react'

/** Abaixo disso a tabela para de encolher e a pagina e que rola. */
export const MIN_TABLE_HEIGHT = 240

/** Respiro abaixo da paginacao (padding do card e da area de conteudo). */
const BOTTOM_GAP = 40

function scrollParentOf(element: HTMLElement): HTMLElement | null {
  let parent = element.parentElement
  while (parent) {
    const { overflowY } = getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll') return parent
    parent = parent.parentElement
  }
  return null
}

/**
 * Altura que sobra para as linhas da tabela ate o fim da tela, descontando a
 * paginacao logo abaixo. Assim a tabela tem altura fixa, o scroll das linhas e
 * interno e "Linhas por pagina" fica sempre a vista. Recalcula quando a tela
 * ou o conteudo acima mudam de tamanho.
 */
export function useAvailableHeight(
  tableRef: RefObject<HTMLElement | null>,
  footerRef: RefObject<HTMLElement | null>
): number | undefined {
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const table = tableRef.current
    if (!table) return

    const scroller = scrollParentOf(table)

    const measure = () => {
      const footer = footerRef.current?.offsetHeight ?? 0
      const tableTop = table.getBoundingClientRect().top
      // Posicao dentro do conteudo rolavel, para nao depender do scroll atual.
      const viewportBottom = scroller
        ? scroller.getBoundingClientRect().top + scroller.clientHeight
        : window.innerHeight
      const offset = scroller ? scroller.scrollTop : window.scrollY
      const available =
        viewportBottom - (tableTop + offset) - footer - BOTTOM_GAP

      setHeight(Math.max(Math.floor(available), MIN_TABLE_HEIGHT))
    }

    measure()
    window.addEventListener('resize', measure)

    if (typeof ResizeObserver === 'undefined') {
      return () => window.removeEventListener('resize', measure)
    }

    // O que fica acima da tabela pode mudar de altura depois (ex.: um resumo
    // que aparece no header quando os dados chegam).
    const observer = new ResizeObserver(measure)
    observer.observe(scroller?.firstElementChild ?? document.body)
    return () => {
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [tableRef, footerRef])

  return height
}

/** Altura atual do elemento, acompanhando mudancas de tamanho. */
export function useElementHeight(
  ref: RefObject<HTMLElement | null>
): number {
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const measure = () => setHeight(element.offsetHeight)
    measure()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return height
}
