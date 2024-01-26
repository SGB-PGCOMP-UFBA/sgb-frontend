import React from 'react'
import { Button } from '@mui/material'
import { useAppContext } from '../../../../../context/appContext'
import { Dialog } from '../../../../../components'

export function DialogExclusaoAgencia({ item, isOpen, onClose }) {
  console.log(item)
  const { deleteAgency } = useAppContext()

  const executeAndClose = (id) => {
    deleteAgency(id)
    onClose()
  }

  const dialogTitle = 'Excluir Agência'

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
        onClick={() => executeAndClose(item.id)}
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
    <Dialog
      open={isOpen}
      onClose={onClose}
      title={dialogTitle}
      content={dialogContent}
      actions={dialogActions}
    />
  )
}
