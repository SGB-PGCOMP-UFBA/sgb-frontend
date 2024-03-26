import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Stack } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { SettingsNotificationsSection } from './components/SettingsNotificationsSection'
import { SettingsPasswordSection } from './components/SettingsPasswordSection'

function LoggedUserSettingsView() {
  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex justify-between">
              <div className="flex items-center gap-x-4">
                <div className="rounded-md bg-yellow-400 p-2 leading-none">
                  <Icon sx={{ fontSize: 32 }}>settings</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Configurações</h2>
                  <p className="poppins font-medium text-gray-500">Acesso e Notificações</p>
                </div>
              </div>
            </div>
            <Stack spacing={3}>
              <SettingsNotificationsSection />
              <SettingsPasswordSection />
            </Stack>
          </div>
        </section>
      </div>
    </div>
  )
}

LoggedUserSettingsView.prototypes = {
  user: PropTypes.node,
  onUpdatePassword: PropTypes.node
}

export { LoggedUserSettingsView }