export const CPF_INCOMPLETE = 'Informe os 11 dígitos do CPF.'
export const CPF_INVALID = 'CPF inválido.'

const CPF_MASK = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

/**
 * Dígito verificador do CPF: soma dos dígitos com pesos decrescentes,
 * resto da divisão por 11; resto menor que 2 vira 0.
 */
function checkDigit(digits: number[]): number {
  const firstWeight = digits.length + 1
  const sum = digits.reduce(
    (total, digit, index) => total + digit * (firstWeight - index),
    0
  )
  const remainder = sum % 11

  return remainder < 2 ? 0 : 11 - remainder
}

/** Confere os dois dígitos finais. Recebe só os 11 dígitos, sem máscara. */
export function isValidCpf(value: string): boolean {
  if (!/^\d{11}$/.test(value)) return false

  // Sequências repetidas (111.111.111-11) passam no cálculo, mas não existem.
  if (/^(\d)\1{10}$/.test(value)) return false

  const digits = value.split('').map(Number)
  const firstCheck = checkDigit(digits.slice(0, 9))
  const secondCheck = checkDigit(digits.slice(0, 10))

  return firstCheck === digits[9] && secondCheck === digits[10]
}

/**
 * Erro do campo de CPF com máscara (`000.000.000-00`), ou `undefined` quando
 * está válido. Campo vazio não é erro: a obrigatoriedade fica no `required`.
 */
export function getCpfError(maskedValue: string): string | undefined {
  if (maskedValue.trim() === '') return undefined
  if (!CPF_MASK.test(maskedValue)) return CPF_INCOMPLETE
  if (!isValidCpf(maskedValue.replace(/\D/g, ''))) return CPF_INVALID

  return undefined
}
