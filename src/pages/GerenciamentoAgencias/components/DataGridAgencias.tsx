import { useMemo, useState } from 'react'
import { ActionIconButton } from '@/components/action-icon-button'
import { Pencil, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import type { DataTableColumn } from '@/components/data-table/types'
import { formatDate } from '../../../helpers/formatters'
import { DialogExclusaoAgencia } from './DialogExclusaoAgencia'
import { DialogEdicaoAgencia } from './DialogEdicaoAgencia'
import type { InclusaoAgenciaFormValues } from './DialogInclusaoAgencia'
import type { UpdateAgencyPayload } from '../../../api/agency'
import type { AgencyDetailed } from '../../../types'

export interface DataGridAgenciasProps {
  data: AgencyDetailed[]
  onCreate: (values: InclusaoAgenciaFormValues) => void
  onUpdate: (agencyId: number, agency: UpdateAgencyPayload) => void
  onDelete: (agencyId: number) => void
}

function DataGridAgencias(props: DataGridAgenciasProps) {
  const { data, onUpdate, onDelete } = props
  const [isDialogForUpdateOpen, setIsDialogForUpdateOpen] = useState(false)
  const [isDialogForDeleteOpen, setIsDialogForDeleteOpen] = useState(false)
  const [selectedAgency, setSelectedAgency] = useState<AgencyDetailed | null>(null)

  const handleDialogForDeleteClose = () => {
    setSelectedAgency(null)
    setIsDialogForDeleteOpen(false)
  }

  const handleDialogForDeleteOpen = (value: AgencyDetailed) => {
    setSelectedAgency(value)
    setIsDialogForDeleteOpen(true)
  }

  const handleDialogForUpdateClose = () => {
    setSelectedAgency(null)
    setIsDialogForUpdateOpen(false)
  }

  const handleDialogForUpdateOpen = (value: AgencyDetailed) => {
    setSelectedAgency(value)
    setIsDialogForUpdateOpen(true)
  }

  const hasScholarships = (agency: AgencyDetailed) => {
    return agency.doctorate_degree_allocated_scholarships > 0 ||
      agency.masters_degree_allocated_scholarships > 0 ||
      agency.scholarshipsSinceBeginning > 0
  }

  const columns = useMemo<DataTableColumn<AgencyDetailed>[]>(
    () => [
      {
        id: 'name',
        header: 'Nome da Agência',
        minWidth: 170,
        cell: (row) => <p className="overflow-auto">{row.name}</p>,
        csv: (row) => row.name
      },
      {
        id: 'description',
        header: 'Descrição',
        minWidth: 500,
        cell: (row) => <p className="overflow-auto">{row.description}</p>,
        csv: (row) => row.description
      },
      {
        id: 'masters_degree_awarded_scholarships',
        header: 'Bolsas Concedidas Para o Mestrado',
        width: 160,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.masters_degree_awarded_scholarships}</p>,
        csv: (row) => row.masters_degree_awarded_scholarships
      },
      {
        id: 'masters_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Mestrado',
        width: 150,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.masters_degree_allocated_scholarships}</p>,
        csv: (row) => row.masters_degree_allocated_scholarships
      },
      {
        id: 'doctorate_degree_awarded_scholarships',
        header: 'Bolsas Concedidas Para o Doutorado',
        width: 160,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.doctorate_degree_awarded_scholarships}</p>,
        csv: (row) => row.doctorate_degree_awarded_scholarships
      },
      {
        id: 'doctorate_degree_allocated_scholarships',
        header: 'Bolsas Alocadas no Doutorado',
        width: 150,
        align: 'center',
        cell: (row) => <p className="overflow-auto">{row.doctorate_degree_allocated_scholarships}</p>,
        csv: (row) => row.doctorate_degree_allocated_scholarships
      },
      {
        id: 'createdAt',
        header: 'Criado Em',
        width: 100,
        cell: (row) => formatDate(row.created_at)
      },
      {
        id: 'updatedAt',
        header: 'Atualizado Em',
        width: 120,
        cell: (row) => formatDate(row.updated_at)
      },
      {
        id: 'actions',
        header: 'Ações',
        width: 150,
        cell: (row) => (
          <div className="flex items-center gap-x-2 overflow-auto">
            <ActionIconButton
              label="Editar Agência"
              icon={Pencil}
              onClick={() => handleDialogForUpdateOpen(row)}
            />
            <ActionIconButton
              label={'Excluir Agência'}
              disabledReason={hasScholarships(row) ? 'Não é possível excluir esta agência' : undefined}
              icon={Trash2}
              onClick={() => handleDialogForDeleteOpen(row)}
            />
          </div>
        )
      }
    ],
    []
  )

  return (
    <div>
      <DataTable data={data} columns={columns} csvFileName="agencias" />

      {selectedAgency && (
        <DialogExclusaoAgencia
          isOpen={isDialogForDeleteOpen}
          item={selectedAgency}
          onClose={handleDialogForDeleteClose}
          onSubmit={onDelete}
        />
      )}

      {selectedAgency && (
        <DialogEdicaoAgencia
          isOpen={isDialogForUpdateOpen}
          item={selectedAgency}
          onClose={handleDialogForUpdateClose}
          onSubmit={onUpdate}
        />
      )}
    </div>
  )
}

export { DataGridAgencias }
