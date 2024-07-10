import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { CpfInputMask, PhoneInputMask } from '../../../components/Masks'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogInclusaoOrientador({ isOpen, onClose, onSubmit }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const newAdvisorData = new FormData(event.currentTarget)

    onSubmit(Object.fromEntries(newAdvisorData.entries()))
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex w-full min-w-[395px] max-w-[595px] flex-col space-y-4">
      <TextField
        required
        fullWidth
        id="name"
        label="Nome"
        type="text"
        name="name"
        placeholder="Insira o nome do orientador"
      />

      <TextField
        required
        fullWidth
        id="email"
        label="E-mail"
        type="email"
        name="email"
        placeholder="Insira o e-mail do orientador"
      />

      <TextField
        fullWidth
        id="tax_id"
        label="CPF"
        type="text"
        name="tax_id"
        placeholder="Insira o CPF do orientador"
        InputProps={{
          inputComponent: CpfInputMask
        }}
      />

      <TextField
        fullWidth
        id="phone_number"
        label="Telefone"
        type="phone"
        name="phone_number"
        placeholder="Insira o telefone do orientador"
        InputProps={{
          inputComponent: PhoneInputMask
        }}
      />
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="contained" color="primary" size="small">
        Cancelar
      </Button>
      <Button autoFocus type="submit" variant="contained" color="success" size="small">
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
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Adicionar Orientador
          <Tooltip title="O(a) orientador(a) receberá no e-mail informado abaixo uma mensagem informando sobre o seu cadastrado bem como a senha para acesso à plataforma.">
            <IconButton color='info'>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogInclusaoOrientador }
