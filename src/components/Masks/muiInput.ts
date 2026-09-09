import type { ElementType } from 'react'
import type { InputBaseComponentProps } from '@mui/material'
import { CpfInputMask } from './CpfInputMask'
import { PhoneInputMask } from './PhoneInputMask'
import MonetaryBrazilianValueMask from './MonetaryBrazilianValueMask'

/**
 * Versoes das mascaras prontas para o `inputComponent` do MUI.
 *
 * O `InputBaseComponentProps` espera `onChange` com um `ChangeEvent` do DOM,
 * mas as mascaras entregam `{ target: { name, value } }` — que e o contrato que
 * os formularios do projeto esperam. O retipo e o padrao que a propria doc do
 * MUI usa para mascaras, centralizado aqui em vez de repetido em cada uso.
 */
export const CpfMaskInput =
  CpfInputMask as unknown as ElementType<InputBaseComponentProps>

export const PhoneMaskInput =
  PhoneInputMask as unknown as ElementType<InputBaseComponentProps>

export const MonetaryMaskInput =
  MonetaryBrazilianValueMask as unknown as ElementType<InputBaseComponentProps>
