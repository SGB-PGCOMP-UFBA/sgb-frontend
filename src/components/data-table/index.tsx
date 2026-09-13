import { useMemo } from 'react'
import {
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable
} from '@tanstack/react-table'
import type { ColumnDef, PaginationState, RowData } from '@tanstack/react-table'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { exportRowsAsCsv } from './export-csv'
import type { DataTableColumn } from './types'

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel()
})

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

export interface DataTableProps<T extends RowData> {
  columns: DataTableColumn<T>[]
  data: T[]
  csvFileName?: string
  pageSizeOptions?: number[]
  initialPageSize?: number
  manualPagination?: boolean
  rowCount?: number
  pagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  emptyMessage?: string
}

function DataTable<T extends RowData>({
  columns,
  data,
  csvFileName = 'dados',
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  initialPageSize = 5,
  manualPagination,
  rowCount,
  pagination,
  onPaginationChange,
  emptyMessage = 'Nenhum resultado encontrado.'
}: DataTableProps<T>) {
  const tableColumns = useMemo<ColumnDef<typeof features, T>[]>(
    () =>
      columns.map((column) => ({
        id: column.id,
        header: column.header,
        cell: ({ row }) => column.cell(row.original)
      })),
    [columns]
  )

  const table = useTable(
    {
      features,
      columns: tableColumns,
      data,
      manualPagination,
      rowCount,
      autoResetPageIndex: false,
      initialState: {
        pagination: { pageIndex: 0, pageSize: initialPageSize }
      },
      ...(pagination
        ? {
            state: { pagination },
            onPaginationChange: (updater) => {
              const next =
                typeof updater === 'function' ? updater(pagination) : updater
              onPaginationChange?.(next)
            }
          }
        : {})
    },
    (state) => ({ pagination: state.pagination })
  )

  const { pageIndex, pageSize } = table.state.pagination
  const total = manualPagination ? (rowCount ?? 0) : data.length
  const firstRow = total === 0 ? 0 : pageIndex * pageSize + 1
  const lastRow = Math.min((pageIndex + 1) * pageSize, total)

  return (
    <div className="w-full min-w-0 bg-white">
      {/* `w-max min-w-full` deixa a tabela passar da largura do container para
          que o scroll horizontal aconteca dentro dela, e nao na pagina. */}
      <Table className="w-max min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const column = columns.find((item) => item.id === header.column.id)

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: column?.width,
                      minWidth: column?.minWidth ?? column?.width
                    }}
                    className={cn(
                      'whitespace-normal break-words leading-tight',
                      column?.align === 'center' && 'text-center',
                      column?.align === 'right' && 'text-right'
                    )}
                  >
                    {column?.header}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      'overflow-hidden text-ellipsis whitespace-nowrap',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                  >
                    {column.cell(row.original)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col items-end border-t">
        <div className="flex w-full flex-wrap items-center justify-between gap-2 p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportRowsAsCsv(
                manualPagination ? data : table.getRowModel().rows.map((row) => row.original),
                columns,
                csvFileName
              )
            }
          >
            Baixar como CSV
            <Download />
          </Button>

          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">Linhas por página</span>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="text-sm text-muted-foreground">
              {firstRow}–{lastRow} de {total}
            </span>

            <div className="flex items-center gap-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próxima
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DataTable }
export type { DataTableColumn }
