import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogEdicaoAgencia({ item, isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)
    const entries = Object.fromEntries(newAgencyData.entries())

    onSubmit(item.id, {
      name: entries.name,
      description: entries.description,
      masters_degree_awarded_scholarships: Number(entries.masters_degree_awarded_scholarships),
      doctorate_degree_awarded_scholarships: Number(entries.doctorate_degree_awarded_scholarships)
    })

    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex w-full min-w-[395px] max-w-[595px] flex-col space-y-4">
      <TextField
        disabled
        required
        fullWidth
        id="name"
        label="Nome"
        type="text"
        name="name"
        defaultValue={item.name}
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
        defaultValue={item.description}
        placeholder="Insira a descrição da agência"
        inputProps={{ maxLength: 255 }}
      />

      <TextField
        fullWidth
        id="masters_degree_awarded_scholarships"
        name="masters_degree_awarded_scholarships"
        label="Bolsas Concedidas Para o Mestrado"
        type="number"
        defaultValue={item.masters_degree_awarded_scholarships}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: 0,
            step: 1,
          },
        }}
      />

      <TextField
        id="doctorate_degree_awarded_scholarships"
        name="doctorate_degree_awarded_scholarships"
        label="Bolsas Concedidas Para o Doutorado"
        type="number"
        defaultValue={item.doctorate_degree_awarded_scholarships}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: 0,
            step: 1,
          },
        }}
      />
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" autoFocus variant="contained" color="success" size="small">
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
      <DialogTitle>Editar Agência</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoAgencia }
