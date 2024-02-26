import PropTypes from 'prop-types'
import Icon from '@mui/material/Icon'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import { DataGridBolsas } from './components/DataGridBolsas'

function GerenciamentoBolsasView(props) {
  const { isLoading, data } = props

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <section className="flex w-full justify-center p-4">
        <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
          <div className="mb-8 flex items-center gap-x-4">
            <div className="rounded-md bg-green-400 p-2 leading-none">
              <Icon sx={{ fontSize: 32 }}>event_available_outlined</Icon>
            </div>
            <div>
              <h2 className="poppins text-xl font-semibold text-gray-900">Bolsas</h2>
              <p className="poppins font-medium text-gray-500">Visualização e Gestão de Bolsas</p>
            </div>
          </div>
          {isLoading ? <Loading /> : <DataGridBolsas data={data} />}
        </div>
      </section>
    </div>
  )
}

GerenciamentoBolsasView.prototypes = {
  data: PropTypes.node,
  isLoading: PropTypes.boolean
}

export { GerenciamentoBolsasView }
