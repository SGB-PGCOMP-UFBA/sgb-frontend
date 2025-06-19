import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '@mui/material'
import { DataGridOrientandos } from './components/DataGridOrientandos'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'

function GerenciamentoOrientandosView(props) {
  const { isLoading, data } = props

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex justify-between">
              <div className="flex items-center gap-x-4">
                <div className="rounded-md bg-green-400 p-2 leading-none">
                  <Icon sx={{ fontSize: 32 }}>people</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Orientandos</h2>
                  <p className="poppins font-medium text-gray-500">Meus Orientandos</p>
                </div>
              </div>
            </div>
            {isLoading ? <Loading /> : <DataGridOrientandos data={data} />}
          </div>
        </section>
      </div>
    </div>
  )
}

GerenciamentoOrientandosView.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.node
}

export { GerenciamentoOrientandosView }
