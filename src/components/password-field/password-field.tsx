import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface PasswordFieldProps {
  id: string
  name: string
  label: string
  placeholder?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
  minLength?: number
  maxLength?: number
  error?: string
}

function PasswordField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  minLength,
  maxLength,
  error
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="toggle password visibility"
          onClick={() => setIsVisible((visible) => !visible)}
          onMouseDown={(event) => event.preventDefault()}
          onMouseUp={(event) => event.preventDefault()}
          className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:bg-transparent"
        >
          {isVisible ? <Eye /> : <EyeOff />}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

export { PasswordField }
