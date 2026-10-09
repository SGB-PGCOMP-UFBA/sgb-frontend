import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldChangeEvent } from '@/types'

export interface NewPasswordFormProps {
  newPassword: string
  confirmNewPassword: string
  onChangeValues: (event: FieldChangeEvent) => void
  onSubmit: () => void
}

function NewPasswordForm(props: NewPasswordFormProps) {
  const { newPassword, confirmNewPassword, onChangeValues, onSubmit } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-4'>
      <p className='mt-4 text-sm text-muted-foreground'>
        Código validado. Cadastre sua nova senha, com 4 a 8 caracteres.
      </p>

      <div className='space-y-1.5'>
        <Label htmlFor='new_password'>Nova senha</Label>
        <Input
          required
          id='new_password'
          name='new_password'
          type='password'
          value={newPassword}
          onChange={onChangeValues}
          placeholder='Digite a nova senha'
          minLength={4}
          maxLength={8}
          autoComplete='new-password'
        />
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='confirm_new_password'>Confirmar nova senha</Label>
        <Input
          required
          id='confirm_new_password'
          name='confirm_new_password'
          type='password'
          value={confirmNewPassword}
          onChange={onChangeValues}
          placeholder='Repita a nova senha'
          minLength={4}
          maxLength={8}
          autoComplete='new-password'
        />
      </div>

      <Button type='submit' className='mb-12 mt-8 w-full'>
        Redefinir senha
      </Button>
    </form>
  )
}

export { NewPasswordForm }
