import { useState } from 'react'
import { MdBusiness } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { CirclePlus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataGridAgencias } from './components/DataGridAgencias'
import { DialogInclusaoAgencia } from './components/DialogInclusaoAgencia'
import type { InclusaoAgenciaFormValues } from './components/DialogInclusaoAgencia'
import Loading from '../../components/loading'
import type { UpdateAgencyPayload } from '../../api/agency'
import type { AgencyDetailed } from '../../types'

export interface GerenciamentoAgenciasViewProps {
  isLoading: boolean
  data: AgencyDetailed[]
  onCreate: (agency: InclusaoAgenciaFormValues) => void
  onUpdate: (agencyId: number, agency: UpdateAgencyPayload) => void
  onDelete: (agencyId: number) => void
}

function GerenciamentoAgenciasView(props: GerenciamentoAgenciasViewProps) {
  const { isLoading, data, onCreate, onUpdate, onDelete } = props
  const [isDialogForCreateOpen, setIsDialogForCreateOpen] = useState(false)

  const handleDialogForCreateClose = () => {
    setIsDialogForCreateOpen(false)
  }

  const handleDialogForCreateOpen = () => {
    setIsDialogForCreateOpen(true)
  }

  return (
    <AppLayout>
      <PageHeader
        title="Agências"
        description="Visualização e Gestão de Agências"
        icon={MdBusiness}
        iconBackgroundClassName="bg-blue-400"
        actions={
          <div className="flex items-center gap-x-4">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => handleDialogForCreateOpen()}
            >
              <CirclePlus />
              Novo
            </Button>
          </div>
        }
      />
      {isLoading ? (
        <Loading />
      ) : (
        <DataGridAgencias
          data={data}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}

      {isDialogForCreateOpen && (
        <DialogInclusaoAgencia
          isOpen={isDialogForCreateOpen}
          onClose={handleDialogForCreateClose}
          onSubmit={onCreate}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoAgenciasView }
