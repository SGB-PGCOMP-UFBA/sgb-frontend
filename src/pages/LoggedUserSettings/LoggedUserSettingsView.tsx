import { MdSettings } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import { PageHeader } from '@/components/page-header'
import { ProfileDetailsSection } from './components/ProfileDetailsSection'
import { SettingsPasswordSection } from './components/SettingsPasswordSection'
import type { StoredUser } from '../../helpers/auth-user'

export interface LoggedUserSettingsViewProps {
  user: StoredUser | null
}

function LoggedUserSettingsView(props: LoggedUserSettingsViewProps) {
  return (
    <AppLayout>
      <PageHeader
        title="Configurações"
        description="Configurações de Usuário e Perfil"
        icon={MdSettings}
        iconBackgroundClassName="bg-red-400"
      />
      <div className="flex flex-col gap-6">
        <ProfileDetailsSection user={props.user} />
        <SettingsPasswordSection user={props.user} />
      </div>
    </AppLayout>
  )
}

export { LoggedUserSettingsView }
