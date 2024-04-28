import PropTypes from 'prop-types'
import { Box, Grid, Container, Icon } from '@mui/material'
import { BolsasCapesCard } from './components/BolsasCapesCard'
import { BolsasFapesbCard } from './components/BolsasFapesbCard'
import { BolsasCnpqCard } from './components/BolsasCnpqCard'
import { TotalBolsasCard } from './components/TotalBolsasCard'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'
import { PieChartBolsasMestrado } from './components/charts/PieChartBolsasMestrado'
import { PieChartBolsasDoutorado } from './components/charts/PieChartBolsasDoutorado'

function DashboardMetricasView(props) {
  const {
    isLoading,
    totalDataCard,
    cnpqDataCard,
    capesDataCard,
    fapesbDataCard,
  } = props

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex items-center gap-x-4">
              <div className="rounded-md bg-red-400 p-2 leading-none">
                <Icon sx={{ fontSize: 32 }}>dashboard</Icon>
              </div>
              <div>
                <h2 className="poppins text-xl font-semibold text-gray-900">Dashboard</h2>
                <p className="poppins font-medium text-gray-500">Métricas e Análises</p>
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Container maxWidth={false} disableGutters>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <BolsasCapesCard data={capesDataCard} sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <BolsasFapesbCard data={fapesbDataCard} sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <BolsasCnpqCard data={cnpqDataCard} sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={6}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <TotalBolsasCard data={totalDataCard} sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <PieChartBolsasDoutorado sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <PieChartBolsasMestrado sx={{ height: '100%' }} />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

DashboardMetricasView.prototypes = {
  isLoading: PropTypes.boolean,
  totalDataCard: PropTypes.number,
  cnpqDataCard: PropTypes.node,
  fapesbDataCard: PropTypes.node,
  capesDataCard: PropTypes.node
}

export { DashboardMetricasView }
