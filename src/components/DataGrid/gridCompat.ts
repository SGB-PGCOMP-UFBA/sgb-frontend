import type { ComponentType } from 'react'
import {
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport
} from '@mui/x-data-grid'

/**
 * O @mui/x-data-grid 5.17 deriva as props destes componentes sob os tipos do
 * @types/react 17. Com o @types/react 18 a derivação passa a exigir props
 * internas que nenhum dos dois usa (`placeholder`, `onResize`,
 * `onPointerEnterCapture`), e usá-los sem props vira erro de tipo. Os quatro
 * não têm props obrigatórias em runtime, então o retipo descreve o real.
 *
 * A correção definitiva é subir o x-data-grid para a v7+, o que muda a API de
 * paginação e exige migrar as 10 grades — trabalho separado.
 */
export const GridPaginationCompat = GridPagination as unknown as ComponentType
export const GridToolbarColumnsButtonCompat =
  GridToolbarColumnsButton as unknown as ComponentType
export const GridToolbarDensitySelectorCompat =
  GridToolbarDensitySelector as unknown as ComponentType
export const GridToolbarExportCompat =
  GridToolbarExport as unknown as ComponentType
