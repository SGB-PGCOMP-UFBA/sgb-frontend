import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
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
      <br/>
      <p>Ele(a) receberá uma nova senha no e-mail informado em seu cadastrado nesta plataforma.</p>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button
        onClick={() => submitAndCloseDialog()}
        autoFocus
        variant="contained"
        color="success"
        size="small"
      >
        Resetar Senha
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose} TransitionComponent={SlideUp}>
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
      <DialogTitle>Resetar a Senha do Orientador</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogResetarSenhaOrientador }
