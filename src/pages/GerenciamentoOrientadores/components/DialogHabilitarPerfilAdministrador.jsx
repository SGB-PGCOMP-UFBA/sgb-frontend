import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogHabilitarPerfilAdministrador({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async () => {
    onSubmit(item.id)
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que deseja {item.has_admin_privileges ? 'desabilitar' : 'habilitar'} o perfil de administrador do orientador(a) <b>{item.name}</b>?
      </p>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Não
      </Button>
      <Button
        onClick={() => submitAndCloseDialog()}
        autoFocus
        variant="contained"
        color="success"
        size="small"
      >
        Sim
      </Button>
    </div>
  )

  const title = item.has_admin_privileges ? 'Desabilitar Perfil de Administrador' : 'Habilitar Perfil de Administrador'

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogHabilitarPerfilAdministrador }
