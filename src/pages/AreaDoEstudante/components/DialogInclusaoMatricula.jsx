import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogInclusaoMatricula(props) {

  const dialogContent = (<div></div>)

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={props.onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" autoFocus variant="contained" color="success" size="small">
        Salvar
      </Button>
    </div>
  )

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      TransitionComponent={SlideUp}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {}
      }}
    >
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Incluir Matrícula</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogInclusaoMatricula }
