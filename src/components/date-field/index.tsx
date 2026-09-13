import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface DateFieldProps {
  id: string
  name: string
  label: string
  defaultValue?: Date | null
  minDate?: Date
  maxDate?: Date
  required?: boolean
  disabled?: boolean
  onChange?: (date: Date | null) => void
  className?: string
}

const DATE_FORMAT = 'dd/MM/yyyy'

function DateField({
  id,
  name,
  label,
  defaultValue,
  minDate,
  maxDate,
  required,
  disabled,
  onChange,
  className,
}: DateFieldProps) {
  const [date, setDate] = useState<Date | null>(defaultValue ?? null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (selected: Date | undefined) => {
    const next = selected ?? null
    setDate(next)
    onChange?.(next)
    setIsOpen(false)
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>{label}</Label>

      <input
        type='hidden'
        id={id}
        name={name}
        value={date ? format(date, DATE_FORMAT) : ''}
        required={required}
        readOnly
      />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            aria-label={label}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date ? format(date, DATE_FORMAT) : <span>Selecione a data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date ?? undefined}
            defaultMonth={date ?? undefined}
            onSelect={handleSelect}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateField }
