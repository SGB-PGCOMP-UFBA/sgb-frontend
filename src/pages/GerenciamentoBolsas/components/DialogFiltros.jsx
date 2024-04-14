import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { FilterAlt, FilterAltOff } from '@mui/icons-material'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogFiltros({ isOpen, onClose, onClear, onSubmit }) {
  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">

    </div>
  )

  const dialogActions = (
    <div className="flex flex-row w-full justify-between p-4">
      <Button
        variant="contained"
        color="info"
        startIcon={<FilterAltOff />}
        onClick={onClear}
      >
          Limpar Todos Os Filtros
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<FilterAlt />}
        onClick={onSubmit}
      >
          Filtrar
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose} TransitionComponent={SlideUp}>
      <DialogTitle>Filtros</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogFiltros }
