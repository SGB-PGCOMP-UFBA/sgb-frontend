import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Stack } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { ProfileDetailsSection } from './components/ProfileDetailsSection'

function LoggedUserProfileView() {
  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex justify-between">
              <div className="flex items-center gap-x-4">
                <div className="rounded-md bg-red-400 p-2 leading-none">
                  <Icon sx={{ fontSize: 32 }}>person</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Perfil</h2>
                  <p className="poppins font-medium text-gray-500">
                    Configurações de Perfil e Usuário
                  </p>
                </div>
              </div>
            </div>
            <Stack spacing={3}>
              <ProfileDetailsSection />
            </Stack>
          </div>
        </section>
      </div>
    </div>
  )
}

LoggedUserProfileView.prototypes = {
  user: PropTypes.node
}

export { LoggedUserProfileView }