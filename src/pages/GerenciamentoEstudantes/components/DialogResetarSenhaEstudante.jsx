import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function DialogResetarSenhaEstudante({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async () => {
    onSubmit({ email: item.email, role: item.role })
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que deseja resetar a senha do(a) estudante(a) <b>{item.name}</b>?
      </p>
      <p>Ele(a) receberá uma nova senha pelo e-mail cadastrado nesta plataforma.</p>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="contained" color="primary" size="small">
        Cancelar
      </Button>
      <Button
        onClick={() => submitAndCloseDialog()}
        autoFocus
        variant="contained"
        color="warning"
        size="small"
      >
        Resetar
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Resetar a Senha do Estudante</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogResetarSenhaEstudante }
