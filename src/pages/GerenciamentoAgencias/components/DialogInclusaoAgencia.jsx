import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogInclusaoAgencia({ isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)

    onSubmit(Object.fromEntries(newAgencyData.entries()))
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
        placeholder="Insira o nome da agência"
        inputProps={{ maxLength: 80 }}
      />

      <TextField
        multiline
        rows={4}
        required
        fullWidth
        id="description"
        label="Descrição"
        type="textarea"
        name="description"
        placeholder="Insira a descrição da agência"
        inputProps={{ maxLength: 255 }}
      />
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button autoFocus type="submit" variant="contained" color="success" size="small">
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
      <DialogTitle>Adicionar Agência</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogInclusaoAgencia }
