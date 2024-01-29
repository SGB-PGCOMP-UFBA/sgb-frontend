import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function DialogExclusaoAgencia({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (id) => {
    onSubmit(id)
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que deseja apagar a agência <b>{item.name}</b>?
      </p>
      <p>Não será possível recuperar as informações relacionadas à ela depois disso.</p>
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="contained" color="primary" size="small">
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Excluir Agência</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogExclusaoAgencia }
