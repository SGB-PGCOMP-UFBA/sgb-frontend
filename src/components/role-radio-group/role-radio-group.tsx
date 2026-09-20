import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { UserRole } from '@/types'

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'STUDENT', label: 'Estudante' },
  { value: 'ADVISOR', label: 'Orientador' },
  { value: 'ADMIN', label: 'Administrador' }
]

export interface RoleRadioGroupProps {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange: (value: string) => void
}

function RoleRadioGroup({
  name = 'role',
  value,
  defaultValue,
  onValueChange
}: RoleRadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">Quem é você?</legend>
      <RadioGroup
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className="flex flex-row flex-wrap gap-x-6 gap-y-2"
      >
        {ROLE_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
            <Label htmlFor={`${name}-${option.value}`} className="font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  )
}

export { RoleRadioGroup }
