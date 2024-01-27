import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'

const initialState = {
  name: '',
  description: ''
}

function DialogEdicaoAgencia({ item, isOpen, onClose, onSubmit }) {
  const [values, setValues] = useState(initialState)

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const submitAndCloseDialog = async () => {
    onSubmit()
    toast.success('Agência atualizada com sucesso.')
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
        value={item.name}
        onChange={(e) => handleChangeValues(e)}
        placeholder="Insira o nome da agência"
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
        value={item.description}
        onChange={(e) => handleChangeValues(e)}
        placeholder="Insira a descrição da agência"
      />
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
        color="success"
        size="small"
      >
        Salvar
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Editar Agência</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoAgencia }
