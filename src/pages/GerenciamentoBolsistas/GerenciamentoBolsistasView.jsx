import PropTypes from 'prop-types'
import { Box, Button, FormControl, Icon, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import { Download, FilterAltOff } from '@mui/icons-material'
import { DataGridBolsistas } from './components/DataGridBolsistas'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'

function GerenciamentoBolsistasView(props) {
  const { isLoading, data, onEditScholarship, onDeleteScholarship } = props

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
                  <h2 className="poppins text-xl font-semibold text-gray-900">Bolsistas</h2>
                  <p className="poppins font-medium text-gray-500">
                    Listagem de Bolsistas do Programa de Pós-Graduação em Computação
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-x-4">
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<Download />}
                  onClick={() => props.handleReportDownload()}
                >
                  Baixar Relatório Anual
                </Button>
              </div>
            </div>
            <Box sx={{ width: '100%', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', padding: '0.6em', marginTop: '0px !important' }}>
              <div className='flex flex-col gap-4 md:flex-row'>
                <FormControl fullWidth>
                  <InputLabel id="label-order">Ordenar por</InputLabel>
                  <Select
                    id="select-order"
                    label="Ordenar por"
                    name="orderBy"
                    labelId="label-order"
                    onChange={props.setFilters}
                    value={props.filters.orderBy}
                  >
                    <MenuItem value={"DAT_MATRICULA_ASC"}>Data da Matrícula ↑</MenuItem>
                    <MenuItem value={"DAT_MATRICULA_DESC"}>Data da Matrícula ↓</MenuItem>
                    <MenuItem value={"DAT_DEFESA_ASC"}>Previsão de Defesa ↑</MenuItem>
                    <MenuItem value={"DAT_DEFESA_DESC"}>Previsão de Defesa ↓</MenuItem>
                    <MenuItem value={"DAT_INICIO_ASC"}>Data de Início da Bolsa ↑</MenuItem>
                    <MenuItem value={"DAT_INICIO_DESC"}>Data de Início da Bolsa ↓</MenuItem>
                    <MenuItem value={"DAT_TERMINO_ASC"}>Data de Término da Bolsa ↑</MenuItem>
                    <MenuItem value={"DAT_TERMINO_DESC"}>Data de Término da Bolsa ↓</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="label-course">Curso</InputLabel>
                  <Select
                    id="select-course"
                    label="Curso"
                    name="programName"
                    labelId="label-course"
                    onChange={props.setFilters}
                    value={props.filters.programName}
                  >
                    {props.filterOptions.programNameFilterList.map((course) => (
                      <MenuItem key={course.key} value={course.key}>
                        {course.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="label-agencia">Agência</InputLabel>
                  <Select
                    id="select-agencia"
                    label="Agência"
                    name="agencyName"
                    labelId="label-agencia"
                    onChange={props.setFilters}
                    value={props.filters.agencyName}
                  >
                    {props.filterOptions.agencyNameFilterList.map((agency) => (
                      <MenuItem key={agency.key} value={agency.key}>
                        {agency.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="label-status">Situação da Bolsa</InputLabel>
                  <Select
                    id="select-status"
                    label="Situação da Bolsa"
                    name="scholarshipStatus"
                    labelId="label-status"
                    onChange={props.setFilters}
                    value={props.filters.scholarshipStatus}
                  >
                    {props.filterOptions.scholarshipStatusFilterList.map((status) => (
                      <MenuItem key={status.key} value={status.key}>
                        {status.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="label-advisor">Nome do Orientador</InputLabel>
                  <Select
                    id="select-advisor"
                    label="Nome do Orientador"
                    name="advisorName"
                    labelId="label-advisor"
                    onChange={props.setFilters}
                    value={props.filters.advisorName}
                  >
                    {props.filterOptions.advisorNameFilterList.map((advisor) => (
                      <MenuItem key={advisor.key} value={advisor.key}>
                        {advisor.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title="Resetar Filtros">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => props.handleResetFilters()}
                  >
                    <FilterAltOff fontSize="medium" />
                  </Button>
                </Tooltip>
              </div>
            </Box>

            {isLoading ? (
              <Loading />
            ) : (
              <DataGridBolsistas
                page={props.page}
                setPage={props.setPage}
                size={props.size}
                setSize={props.setSize}
                data={data.items}
                filterOptions={props.filterOptions}
                metadata={data.meta}
                onEdit={onEditScholarship}
                onDelete={onDeleteScholarship}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

GerenciamentoBolsistasView.prototypes = {
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
  onEditScholarship: PropTypes.node,
  onDeleteScholarship: PropTypes.node,
  isDialogForFiltersOpen: PropTypes.node,
  handleReportDownload: PropTypes.node,
  handleDialogForFiltersOpen: PropTypes.node,
  handleDialogForFiltersClose: PropTypes.node
}

export { GerenciamentoBolsistasView }
