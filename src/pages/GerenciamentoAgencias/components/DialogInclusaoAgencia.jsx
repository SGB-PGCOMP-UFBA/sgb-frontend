import React from 'react'
import { toast } from 'react-toastify'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function DialogInclusaoAgencia({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (id) => {
    onSubmit(id)
    toast.success('Agência excluída com sucesso.')
    onClose()
  }

  const dialogContent = (
    <div>
      <p>Esta ação é irreversível. Você tem certeza?</p>
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

export { DialogInclusaoAgencia }
