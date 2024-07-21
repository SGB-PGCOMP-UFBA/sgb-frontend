import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogExclusaoBolsa(props) {
  const { scholarship, isOpen, onClose, onSubmit } = props

  const submitAndCloseDialog = async (id) => {
    onSubmit(id)
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <p>
        Você tem certeza que quer apagar as informações sobre a sua bolsa da{' '}
        <b>{scholarship.agency.name}</b>?
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
        onClick={() => submitAndCloseDialog(scholarship.id)}
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
      <DialogTitle>Excluir Bolsa</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogExclusaoBolsa }
