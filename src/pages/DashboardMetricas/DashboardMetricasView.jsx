import PropTypes from 'prop-types'
import { Box, Grid, Container, Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { BolsasCapesCard } from './components/BolsasCapesCard'
import { BolsasFapesbCard } from './components/BolsasFapesbCard'
import { BolsasCnpqCard } from './components/BolsasCnpqCard'
import { TotalBolsasCard } from './components/TotalBolsasCard'
import { DetalhamentoBolsasChart } from './components/DetalhamentoBolsasChart'
import { DetalhamentoAlunosChart } from './components/DetalhamentoAlunosChart'
import Loading from '../../components/Loading'

function DashboardMetricasView(props) {
  const { isLoading, totalDataCard, cnpqDataCard, capesDataCard, fapesbDataCard } = props

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar userType="admin" />
      <section className="flex w-full justify-center p-4">
        <div className="shadow-base h-max w-full rounded-lg bg-white p-4 lg:w-full">
          <div className="mb-8 flex items-center gap-x-4">
            <div className="rounded-md bg-gray-300 p-2 leading-none">
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
                    lg={3}
                    sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                  >
                    <BolsasCapesCard data={capesDataCard} sx={{ height: '100%' }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                  >
                    <BolsasFapesbCard data={fapesbDataCard} sx={{ height: '100%' }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                  >
                    <BolsasCnpqCard data={cnpqDataCard} sx={{ height: '100%' }} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                  >
                    <TotalBolsasCard data={totalDataCard} sx={{ height: '100%' }} />
                  </Grid>
                  <Grid item xs={12} lg={8} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                    <DetalhamentoBolsasChart
                      difference={12}
                      positive
                      sx={{ height: '100%' }}
                      value="24"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                  >
                    <DetalhamentoAlunosChart
                      difference={12}
                      positive
                      sx={{ height: '100%' }}
                      value="24"
                    />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          )}
        </div>
      </section>
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
