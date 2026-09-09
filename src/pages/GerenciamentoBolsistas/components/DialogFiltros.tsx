import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material'
import FilterAltOff from '@mui/icons-material/FilterAltOff'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'
import { SelectInput } from '../../../components'
import type {
  ScholarshipFilterChangeEvent,
  ScholarshipFilterOptions,
  ScholarshipPageFilters
} from '../GerenciamentoBolsistas'

export interface DialogFiltrosProps {
  filters: ScholarshipPageFilters
  setFilters: (event: ScholarshipFilterChangeEvent) => void
  filterOptions: ScholarshipFilterOptions
  isOpen: boolean
  onClose: () => void
  onClear: () => void
}

function DialogFiltros({ filters, setFilters, filterOptions, isOpen, onClose, onClear }: DialogFiltrosProps) {
  const clearAllFilters = () => {
    onClear()
    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
      <div className="mb-4">
        <SelectInput
          id="select-programName"
          name="programName"
          label="Curso"
          options={filterOptions.programNameFilterList}
          selected={filters.programName}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          id="select-scholarshipStatus"
          name="scholarshipStatus"
          label="Status da Bolsa"
          options={filterOptions.scholarshipStatusFilterList}
          selected={filters.scholarshipStatus}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          id="select-agencyName"
          name="agencyName"
          label="Agência"
          options={filterOptions.agencyNameFilterList}
          selected={filters.agencyName}
          handleChange={setFilters}
        />
      </div>

      <div className="mb-4">
        <SelectInput
          id="select-advisorName"
          name="advisorName"
          label="Orientador"
          options={filterOptions.advisorNameFilterList}
          selected={filters.advisorName}
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
      <DialogTitle>Filtros</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogFiltros }
