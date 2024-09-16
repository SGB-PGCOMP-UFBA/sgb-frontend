import { parse, isValid } from 'date-fns';

export const formatType = (type, courseType, scholarshipDate, sort) => {
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

export const formatDate = (date) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('pt-BR')
}

export const formatDateHour = (date) => {
  const newDate = new Date(date)
  return newDate.toLocaleString('pt-BR')
}

export function formattedNow() {
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

export const formatPhone = (phone) => {
  if(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}

export const formatCpf = (tax_id) => {
  if(tax_id) {
    return tax_id.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}

export function parseDate(dateString, format = "dd/MM/yyyy") {
  const parsedDate = parse(dateString, format, new Date().toISOString());

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  return null;
}

export function toPascalCase(str) {
  if (str.trim().length === 0 || str === null || str === undefined) {
    return ""
  }

  return str
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase())
}
