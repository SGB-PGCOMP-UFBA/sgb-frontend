import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogExclusaoOrientador({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (id) => {
    onSubmit(id)
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que deseja apagar do sistema o(a) orientador(a) <b>{item.name}</b>?
      </p>
      <br />
      <p>Não será possível recuperar estas informações após a exclusão!</p>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button
        onClick={() => submitAndCloseDialog(item.id)}
        autoFocus
        variant="contained"
        color="error"
        size="small"
      >
        Excluir
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
      <DialogTitle>Excluir Orientador</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogExclusaoOrientador }
