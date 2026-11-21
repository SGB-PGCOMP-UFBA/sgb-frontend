import { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { CirclePlus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataGridAlocacoes } from './components/data-grid-alocacoes'
import { DialogInclusaoAlocacao } from './components/dialog-inclusao-alocacao'
import type { InclusaoAlocacaoFormValues } from './components/dialog-inclusao-alocacao'
import Loading from '@/components/loading'
import type { AllocationDetailed } from '@/types'

export interface GerenciamentoAlocacoesViewProps {
  isLoading: boolean
  data: AllocationDetailed[]
  onCreate: (allocation: InclusaoAlocacaoFormValues) => void
  onView: (allocation: AllocationDetailed) => void
  onEdit: (allocation: AllocationDetailed) => void
  onDelete: (allocationId: number) => void
}

function GerenciamentoAlocacoesView(props: GerenciamentoAlocacoesViewProps) {
  const { isLoading, data, onCreate, onView, onEdit, onDelete } = props
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
        title="Alocações"
        description="Visualização e Gestão de Alocações"
        icon={MdLocationOn}
        iconBackgroundClassName="bg-purple-400"
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
        <DataGridAlocacoes
          data={data}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {isDialogForCreateOpen && (
        <DialogInclusaoAlocacao
          isOpen={isDialogForCreateOpen}
          onClose={handleDialogForCreateClose}
          onSubmit={onCreate}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoAlocacoesView }
