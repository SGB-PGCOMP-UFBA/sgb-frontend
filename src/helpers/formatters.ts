import { parse, isValid } from 'date-fns'

/** Chaves usadas pelos <Select> de filtro do dashboard. */
export type FormatTypeKind = 'course' | 'scholarship' | 'sort'

/**
 * Escolhe qual dos tres rotulos exibir conforme o tipo pedido, caindo em
 * 'Todos' quando o valor correspondente for o placeholder '-'.
 */
export const formatType = (
  type: FormatTypeKind,
  courseType: string,
  scholarshipDate: string,
  sort: string
): string => {
  if (type === 'course' && courseType !== '-') {
    return courseType
  }
  if (type === 'scholarship' && scholarshipDate !== '-') {
    return scholarshipDate
  }
  if (type === 'sort' && sort !== '-') {
    return sort
  }
  return 'Todos'
}

export const formatDate = (date: string | number | Date): string => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('pt-BR')
}

export const formatDateHour = (date: string | number | Date): string => {
  const newDate = new Date(date)
  return newDate.toLocaleString('pt-BR')
}

/** Timestamp so com digitos, usado para compor nomes de arquivo. */
export function formattedNow(): string {
  const now = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return now.replace(/[^0-9]/g, '')
}

/** Devolve undefined quando o telefone vem vazio ou nulo. */
export const formatPhone = (
  phone: string | null | undefined
): string | undefined => {
  if (phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return undefined
}

/** Devolve undefined quando o CPF vem vazio ou nulo. */
export const formatCpf = (
  tax_id: string | null | undefined
): string | undefined => {
  if (tax_id) {
    return tax_id.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return undefined
}

/** Devolve null quando a string nao casa com o formato pedido. */
export function parseDate(
  dateString: string,
  format = 'dd/MM/yyyy'
): Date | null {
  const parsedDate = parse(dateString, format, new Date())

  if (isValid(parsedDate)) {
    return parsedDate
  }

  return null
}

export function toPascalCase(str: string | null | undefined): string {
  if (str === null || str === undefined || str.trim().length === 0) {
    return ''
  }

  return str
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase())
}

export function formatBrazilianCurrency(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || String(value).trim() === '') {
    return 'R$ 0,00'
  }
  return `R$ ${Number(value)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
