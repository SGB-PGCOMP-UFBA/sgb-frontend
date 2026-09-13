import { MdPeople } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { DataGridOrientandos } from './components/DataGridOrientandos'
import Loading from '../../components/loading'
import type { StudentDetailedWithFullRelations } from '../../types'

export interface GerenciamentoOrientandosViewProps {
  isLoading: boolean
  data: StudentDetailedWithFullRelations[]
}

function GerenciamentoOrientandosView(props: GerenciamentoOrientandosViewProps) {
  const { isLoading, data } = props

  return (
    <AppLayout>
      <PageHeader
        title="Orientandos"
        description="Meus Orientandos"
        icon={MdPeople}
        iconBackgroundClassName="bg-green-400"
      />
      {isLoading ? <Loading /> : <DataGridOrientandos data={data} />}
    </AppLayout>
  )
}

export { GerenciamentoOrientandosView }
