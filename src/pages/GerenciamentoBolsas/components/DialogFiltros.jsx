import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { FilterAltOff } from '@mui/icons-material'
import { SlideUp } from '../../../components/Transitions/SlideUp'
import { SelectInput } from '../../../components'

function DialogFiltros({ filters, setFilters, filterOptions, isOpen, onClose, onClear }) {
  const clearAllFilters = () => {
    onClear()
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <div className="mb-4">
        <SelectInput
          name="programName"
          label="Curso"
          options={filterOptions.programNameFilterList}
          selected={filters.programName}
          formValues={filters}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          name="scholarshipStatus"
          label="Status da Bolsa"
          options={filterOptions.scholarshipStatusFilterList}
          selected={filters.scholarshipStatus}
          formValues={filters}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          name="agencyName"
          label="Agência"
          options={filterOptions.agencyNameFilterList}
          selected={filters.agencyName}
          formValues={filters}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          name="advisorName"
          label="Orientador"
          options={filterOptions.advisorNameFilterList}
          selected={filters.advisorName}
          formValues={filters}
          handleChange={setFilters}
        />
      </div>
    </div>
  )

  const dialogActions = (
    <div className="flex flex-row w-full justify-end p-4">
      <Button
        variant="contained"
        color="info"
        startIcon={<FilterAltOff />}
        onClick={clearAllFilters}
      >
          Limpar Todos Os Filtros
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
