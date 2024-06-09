import PropTypes from 'prop-types'
import { Button, Icon } from '@mui/material'
import { Download, FilterAlt } from '@mui/icons-material'
import { DataGridBolsas } from './components/DataGridBolsas'
import { DialogFiltros } from './components/DialogFiltros'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'

function GerenciamentoBolsasView(props) {
  const { isLoading, data, onDeleteScholarship } = props

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
                  <Icon sx={{ fontSize: 32 }}>work</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Bolsas</h2>
                  <p className="poppins font-medium text-gray-500">
                    Visualização dos Bolsistas do Programa de Pós-Graduação
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => props.handleDialogForFiltersOpen()}
                >
                  <FilterAlt fontSize="medium" />
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<Download />}
                  onClick={() => props.handleReportDownload()}
                >
                  Baixar Relatório Completo
                </Button>
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <DataGridBolsas
                page={props.page}
                setPage={props.setPage}
                size={props.size}
                setSize={props.setSize}
                data={data.items}
                metadata={data.meta}
                onDelete={onDeleteScholarship}
              />
            )}

            {!isLoading && (
              <DialogFiltros
                filterOptions={props.filterOptions}
                filters={props.filters}
                setFilters={props.setFilters}
                isOpen={props.isDialogForFiltersOpen}
                onClose={props.handleDialogForFiltersClose}
                onClear={props.handleResetFilters}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

GerenciamentoBolsasView.prototypes = {
  data: PropTypes.node,
  page: PropTypes.number,
  setPage: PropTypes.node,
  size: PropTypes.number,
  setSize: PropTypes.node,
  filters: PropTypes.node,
  setFilters: PropTypes.node,
  handleResetFilters: PropTypes.node,
  filterOptions: PropTypes.node,
  isLoading: PropTypes.boolean,
  onDeleteScholarship: PropTypes.node,
  isDialogForFiltersOpen: PropTypes.node,
  handleReportDownload: PropTypes.node,
  handleDialogForFiltersOpen: PropTypes.node,
  handleDialogForFiltersClose: PropTypes.node
}

export { GerenciamentoBolsasView }
