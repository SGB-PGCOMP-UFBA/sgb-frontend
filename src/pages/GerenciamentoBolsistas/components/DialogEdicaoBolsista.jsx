import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, DialogActions, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'
import { DatePicker } from '@mui/x-date-pickers';

function DialogEdicaoBolsista({ item, isOpen, onClose, onSubmit }) {
  console.log(item)
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)

    onSubmit(item.id, Object.fromEntries(newAgencyData.entries()))
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
        defaultValue={item.name}
        placeholder="Insira o nome da agência"
      />
      <DatePicker label="Basic date picker" />
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
      TransitionComponent={SlideUp}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => submitAndCloseDialog(event)
      }}
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
      <DialogTitle>Editar Bolsista</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoBolsista }
