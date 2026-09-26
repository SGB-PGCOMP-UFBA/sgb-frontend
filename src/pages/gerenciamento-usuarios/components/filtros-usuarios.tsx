import { useState } from 'react'
import { FilterX, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ALL_FILTER_KEY } from '@/constants/status.constant'
import { USER_ROLE_FILTER_OPTIONS } from '@/constants/user-role.constant'
import { readFormValues } from '@/helpers/form-values.helper'
import type { UserFilters, UserRole } from '@/types'

interface FiltrosUsuariosFormFields {
  name: string
  email: string
  role: string
}

export interface FiltrosUsuariosProps {
  isLoading: boolean
  onSearch: (filters: UserFilters) => void
}

function FiltrosUsuarios({ isLoading, onSearch }: FiltrosUsuariosProps) {
  const [formKey, setFormKey] = useState(0)

  const submitFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const entries = readFormValues<FiltrosUsuariosFormFields>(
      new FormData(event.currentTarget)
    )

    onSearch({
      name: entries.name.trim() || undefined,
      email: entries.email.trim() || undefined,
      role:
        entries.role && entries.role !== ALL_FILTER_KEY
          ? (entries.role as UserRole)
          : undefined,
    })
  }

  const resetFilters = () => {
    setFormKey(key => key + 1)
    onSearch({})
  }

  return (
    <form
      key={formKey}
      onSubmit={submitFilters}
      className='!mt-0 w-full rounded border border-gray-200 p-[0.6em]'
    >
      <div className='flex flex-col gap-4 md:flex-row md:items-end'>
        <div className='flex-1 space-y-1.5'>
          <Label htmlFor='filter-name'>Nome</Label>
          <Input
            id='filter-name'
            name='name'
            placeholder='Buscar por nome'
            maxLength={80}
          />
        </div>

        <div className='flex-1 space-y-1.5'>
          <Label htmlFor='filter-email'>E-mail</Label>
          <Input
            id='filter-email'
            name='email'
            placeholder='Buscar por e-mail'
            maxLength={80}
          />
        </div>

        <div className='flex-1 space-y-1.5'>
          <Label htmlFor='filter-role'>Perfil</Label>
          <Select name='role' defaultValue={ALL_FILTER_KEY}>
            <SelectTrigger id='filter-role'>
              <SelectValue placeholder='Selecione um perfil' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FILTER_KEY}>Todos</SelectItem>
              {USER_ROLE_FILTER_OPTIONS.map(option => (
                <SelectItem key={option.key} value={option.key}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex gap-2'>
          <Button
            type='submit'
            className='whitespace-nowrap'
            disabled={isLoading}
          >
            <Search />
            Buscar
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='destructive'
                aria-label='Limpar Filtros'
                onClick={resetFilters}
              >
                <FilterX />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Limpar Filtros</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

export { FiltrosUsuarios }
