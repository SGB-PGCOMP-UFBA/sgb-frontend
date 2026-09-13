import type { DataTableColumn } from './types'

function escapeCsvValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return ''
  }

  const text = String(value)

  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function exportRowsAsCsv<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  fileName: string
): void {
  const exportable = columns.filter((column) => column.csv)

  const header = exportable.map((column) => escapeCsvValue(column.header))
  const body = rows.map((row) =>
    exportable.map((column) => escapeCsvValue(column.csv?.(row)))
  )

  const csv = [header, ...body].map((line) => line.join(';')).join('\r\n')

  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8;'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
