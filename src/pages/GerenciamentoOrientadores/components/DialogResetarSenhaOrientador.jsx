import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogResetarSenhaOrientador({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async () => {
    onSubmit({ email: item.email, role: item.role })
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que deseja resetar a senha do(a) orientador(a) <b>{item.name}</b>?
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
    <Dialog open={isOpen} onClose={onClose} TransitionComponent={SlideUp}>
      <DialogTitle>Resetar a Senha do Orientador</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogResetarSenhaOrientador }
