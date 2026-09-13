import { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { CirclePlus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataGridAllocacoes } from './components/DataGridAlocacoes'
import { DialogInclusaoAlocacao } from './components/DialogInclusaoAlocacao'
import type { InclusaoAlocacaoFormValues } from './components/DialogInclusaoAlocacao'
import Loading from '../../components/loading'
import type { UpdateAllocationPayload } from '../../api/allocation'
import type { AllocationDetailed } from '../../types'

export interface GerenciamentoAlocacoesViewProps {
  isLoading: boolean
  data: AllocationDetailed[]
  onCreate: (allocation: InclusaoAlocacaoFormValues) => void
  onUpdate: (allocationId: number, allocation: UpdateAllocationPayload) => void
  onDelete: (allocationId: number) => void
}

function GerenciamentoAlocacoesView(props: GerenciamentoAlocacoesViewProps) {
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
        <DataGridAllocacoes
          data={data}
          onCreate={onCreate}
          onUpdate={onUpdate}
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
