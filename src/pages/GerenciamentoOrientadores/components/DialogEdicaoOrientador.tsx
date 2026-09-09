import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'
import type { UpdateAdvisorPayload } from '../../../api/advisor'
import type { AdvisorDetailed, UserStatus } from '../../../types'
import { CpfMaskInput, PhoneMaskInput } from '../../../components/Masks/muiInput'
import { readFormValues } from '../../../helpers/form-values'

/**
 * Campos do formulario. Sao todos `TextField` de texto ou `<Select>` — nao ha
 * input de arquivo —, entao o `FormData` devolve apenas strings, com as chaves
 * declaradas em cada `name`.
 */
export interface EdicaoOrientadorFormFields {
  name: string
  email: string
  tax_id: string
  phone_number: string
  status: UserStatus
}

export interface DialogEdicaoOrientadorProps {
  item: AdvisorDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: UpdateAdvisorPayload) => void
}

function DialogEdicaoOrientador({ item, isOpen, onClose, onSubmit }: DialogEdicaoOrientadorProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newFormData = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoOrientadorFormFields>(newFormData)

    const payload: UpdateAdvisorPayload = {
      ...entries,
      current_email: item.email,
      tax_id: entries.tax_id.replace(/[^0-9]/g, ''),
      phone_number: entries.phone_number.replace(/[^0-9]/g, ''),
      status: entries.status,
    }

    onSubmit(payload)
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex w-full min-w-[395px] max-w-[595px] flex-col space-y-4">
      <TextField
        required
        fullWidth
        id="name"
        label="Nome"
        type="text"
        name="name"
        placeholder="Insira o nome do orientador"
        defaultValue={item.name}
        inputProps={{ maxLength: 80 }}
      />

      <TextField
        required
        fullWidth
        id="email"
        label="E-mail"
        type="email"
        name="email"
        placeholder="Insira o e-mail do orientador"
        defaultValue={item.email}
        inputProps={{ maxLength: 80 }}
      />

      <TextField
        fullWidth
        id="tax_id"
        label="CPF"
        type="text"
        name="tax_id"
        placeholder="Insira o CPF do orientador"
        InputProps={{
          inputComponent: CpfMaskInput
        }}
        defaultValue={item.tax_id}
      />

      <TextField
        fullWidth
        id="phone_number"
        label="Telefone"
        type="phone"
        name="phone_number"
        placeholder="Insira o telefone do orientador"
        InputProps={{
          inputComponent: PhoneMaskInput
        }}
        defaultValue={item.phone_number}
      />

      <FormControl fullWidth required>
        <InputLabel id="label-status">Situação</InputLabel>
        <Select
          labelId="label-status"
          id="select-status"
          defaultValue={item.status}
          label="Situação"
          name="status"
        >
          <MenuItem value={"ACTIVE"}>Ativo(a)</MenuItem>
          <MenuItem value={"INACTIVE"}>Inativo(a)</MenuItem>
        </Select>
      </FormControl>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" autoFocus variant="contained" color="success" size="small">
        Salvar
      </Button>
    </div>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => submitAndCloseDialog(event)
      }}
      TransitionComponent={SlideUp}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Editar Orientador</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoOrientador }
