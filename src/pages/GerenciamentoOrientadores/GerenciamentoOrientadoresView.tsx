import { useState } from 'react'
import { MdPeople } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { CirclePlus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataGridOrientadores } from './components/DataGridOrientadores'
import { DialogInclusaoOrientador } from './components/DialogInclusaoOrientador'
import type { InclusaoOrientadorFormValues } from './components/DialogInclusaoOrientador'
import Loading from '../../components/loading'
import type { UpdateAdvisorPayload } from '../../api/advisor'
import type { ResetPasswordPayload } from '../../api/password'
import type { AdvisorDetailed } from '../../types'

export interface GerenciamentoOrientadoresViewProps {
  isLoading: boolean
  data: AdvisorDetailed[]
  onCreate: (advisor: InclusaoOrientadorFormValues) => void
  onUpdate: (payload: UpdateAdvisorPayload) => void
  onDelete: (advisorId: number) => void
  onChangeProfile: (advisorId: number) => void
  onResetPassword: (payload: ResetPasswordPayload) => void
}

function GerenciamentoOrientadoresView(props: GerenciamentoOrientadoresViewProps) {
  const { isLoading, data, onCreate, onUpdate, onDelete, onResetPassword, onChangeProfile } = props
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
        title="Orientadores"
        description="Visualização e Gestão de Orientadores"
        icon={MdPeople}
        iconBackgroundClassName="bg-yellow-400"
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
        <DataGridOrientadores
          data={data}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeProfile={onChangeProfile}
          onResetPassword={onResetPassword}
        />
      )}

      {isDialogForCreateOpen && (
        <DialogInclusaoOrientador
          isOpen={isDialogForCreateOpen}
          onClose={handleDialogForCreateClose}
          onSubmit={onCreate}
        />
      )}
    </AppLayout>
  )
}

export { GerenciamentoOrientadoresView }
