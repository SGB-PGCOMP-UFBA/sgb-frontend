export interface DataTableColumn<T> {
  id: string
  header: string
  cell: (row: T) => React.ReactNode
  csv?: (row: T) => string | number | null | undefined
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
}
