import { FilterX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type {
  ScholarshipFilterChangeEvent,
  ScholarshipFilterOptions,
  ScholarshipPageFilters
} from '@/pages/GerenciamentoBolsistas/GerenciamentoBolsistas'

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

  const handleSelectChange = (name: string) => (value: string) => {
    setFilters({ target: { name, value } })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-inter sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col pt-2">
          <div className="mb-4 space-y-1.5">
            <Label htmlFor="select-programName">Curso</Label>
            <Select value={filters.programName} onValueChange={handleSelectChange('programName')}>
              <SelectTrigger id="select-programName">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.programNameFilterList.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="select-scholarshipStatus">Status da Bolsa</Label>
            <Select
              value={filters.scholarshipStatus}
              onValueChange={handleSelectChange('scholarshipStatus')}
            >
              <SelectTrigger id="select-scholarshipStatus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.scholarshipStatusFilterList.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="select-agencyName">Agência</Label>
            <Select value={filters.agencyName} onValueChange={handleSelectChange('agencyName')}>
              <SelectTrigger id="select-agencyName">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.agencyNameFilterList.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 space-y-1.5">
            <Label htmlFor="select-advisorName">Orientador</Label>
            <Select value={filters.advisorName} onValueChange={handleSelectChange('advisorName')}>
              <SelectTrigger id="select-advisorName">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.advisorNameFilterList.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={clearAllFilters}>
            <FilterX />
            Limpar Todos Os Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogFiltros }
