import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'
import { CpfInputMask, PhoneInputMask } from '../../../components/Masks'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogEdicaoEstudante({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newStudentData = new FormData(event.currentTarget)

    onSubmit(item.id, Object.fromEntries(newStudentData.entries()))
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
        placeholder="Insira o nome do estudante"
        defaultValue={item.name}
      />

      <TextField
        required
        fullWidth
        id="email"
        label="E-mail"
        type="email"
        name="email"
        placeholder="Insira o e-mail do estudante"
        defaultValue={item.email}
      />

      <TextField
        required
        fullWidth
        id="tax_id"
        label="CPF"
        type="text"
        name="tax_id"
        placeholder="Insira o CPF do estudante"
        InputProps={{
          inputComponent: CpfInputMask
        }}
        defaultValue={item.tax_id}
      />

      <TextField
        required
        fullWidth
        id="phone_number"
        label="Telefone"
        type="phone"
        name="phone_number"
        placeholder="Insira o telefone do estudante"
        InputProps={{
          inputComponent: PhoneInputMask
        }}
        defaultValue={item.phone_number}
      />

      <TextField
        required
        fullWidth
        id="link_to_lattes"
        label="Link para o Lattes"
        type="text"
        name="link_to_lattes"
        placeholder="Insira o link para o lattes do estudante"
        defaultValue={item.link_to_lattes}
      />
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="contained" color="primary" size="small">
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
        onSubmit: (event) => submitAndCloseDialog(event)
      }}
      TransitionComponent={SlideUp}
    >
      <DialogTitle>Editar Estudante</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoEstudante }
