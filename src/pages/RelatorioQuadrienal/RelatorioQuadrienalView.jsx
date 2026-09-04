import { useState } from 'react' // Importe o useState
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  FormControl,
  Icon,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import Description from '@mui/icons-material/Description'
import Download from '@mui/icons-material/Download'
import FilterAltOff from '@mui/icons-material/FilterAltOff'
import Search from '@mui/icons-material/Search'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'
import { DatePicker } from '@mui/x-date-pickers'
import { DataGridQuadrienal } from './components/DataGridQuadrienal'

function RelatorioQuadrienalView({
  data,
  isLoading,
  handleResetDates,
  handleReportDownload,
  startDate,
  endDate,
  setEndDate,
  minEndDate,
  handleStartDateChange,
  generateScholarshipsReportByPeriod,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleOpenMenu = event => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  const onDownload = format => {
    handleReportDownload(format)
    handleCloseMenu()
  }

  return (
    <div className='flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row'>
      <Sidebar />
      <div className='flex w-full flex-col justify-start'>
        <MenuAppBar />
        <section className='flex w-full justify-center p-4'>
          <div className='shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full'>
            <div className='mb-8 flex justify-between'>
              <div className='flex items-center gap-x-4'>
                <div className='rounded-md bg-orange-400 p-2 leading-none'>
                  <Icon sx={{ fontSize: 32 }}>date_range</Icon>
                </div>
                <div>
                  <h2 className='poppins text-xl font-semibold text-gray-900'>
                    Relatório Quadrienal
                  </h2>
                  <p className='poppins font-medium text-gray-500'>
                    Relatório de Bolsas do Programa de Pós-Graduação em
                    Computação Dentro do Período
                  </p>
                </div>
              </div>
              <div className='hidden items-center gap-x-4 md:flex'>
                <Button
                  id='export-button'
                  variant='contained'
                  color='info'
                  startIcon={<Download />}
                  endIcon={<KeyboardArrowDown />}
                  onClick={handleOpenMenu}
                  disabled={!data || data.length === 0 || isLoading}
                >
                  Exportar Relatório
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => onDownload('pdf')}>
                    <Description fontSize='small' sx={{ mr: 1 }} /> Baixar em
                    PDF
                  </MenuItem>
                  {/* <MenuItem onClick={() => onDownload('xlsx')}>
                    <Icon sx={{ mr: 1, fontSize: '1.2rem' }}>table_view</Icon>{' '}
                    Baixar em Excel (XLSX)
                  </MenuItem> */}
                </Menu>
              </div>
            </div>
            <Box
              sx={{
                width: '100%',
                border: '1px solid rgba(224, 224, 224, 1)',
                borderRadius: '4px',
                padding: '0.6em',
                marginTop: '0px !important',
              }}
            >
              <div className='flex flex-col gap-4 md:flex-row'>
                <FormControl fullWidth>
                  <DatePicker
                    label='Data de Início da Bolsa'
                    name='scholarship_starts_at'
                    defaultValue={null}
                    value={startDate}
                    onChange={handleStartDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        InputLabelProps: { shrink: true },
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <DatePicker
                    label='Data de Término da Bolsa'
                    name='scholarship_ends_at'
                    minDate={minEndDate}
                    defaultValue={null}
                    value={endDate}
                    onChange={newValue => setEndDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        InputLabelProps: { shrink: true },
                      },
                    }}
                  />
                </FormControl>
                <div className='flex gap-2'>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<Search />}
                    disabled={!startDate || !endDate || isLoading}
                    onClick={generateScholarshipsReportByPeriod}
                    sx={{ whiteSpace: 'nowrap', height: '56px' }}
                  >
                    Gerar
                  </Button>

                  <Tooltip title='Resetar Filtros'>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={handleResetDates}
                      sx={{ height: '56px' }}
                    >
                      <FilterAltOff fontSize='medium' />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Box>
            {isLoading ? (
              <Loading />
            ) : data && data.length > 0 ? (
              <DataGridQuadrienal data={data} />
            ) : (
              <div className='rounded-lg border-2 border-dashed border-gray-200 py-20 text-center'>
                <Typography className='text-gray-400'>
                  Nenhum dado disponível. Selecione as datas e clique em "Gerar
                  Relatório".
                </Typography>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

RelatorioQuadrienalView.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  handleResetDates: PropTypes.func,
  handleReportDownload: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func,
  minEndDate: PropTypes.instanceOf(Date),
  handleStartDateChange: PropTypes.func,
  generateScholarshipsReportByPeriod: PropTypes.func,
}

export { RelatorioQuadrienalView }
