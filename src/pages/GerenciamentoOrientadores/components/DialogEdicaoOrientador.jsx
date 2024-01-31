import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'
import { CpfInputMask, PhoneInputMask } from '../../../components/Masks'

function DialogEdicaoOrientador({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newAdvisorData = new FormData(event.currentTarget)

    onSubmit(item.id, Object.fromEntries(newAdvisorData.entries()))
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
      />

      <TextField
        required
        fullWidth
        id="tax_id"
        label="CPF"
        type="text"
        name="tax_id"
        placeholder="Insira o CPF do orientador"
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
        placeholder="Insira o telefone do orientador"
        InputProps={{
          inputComponent: PhoneInputMask
        }}
        defaultValue={item.phone_number}
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
    >
      <DialogTitle>Editar Orientador</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoOrientador }
