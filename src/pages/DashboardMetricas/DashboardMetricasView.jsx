import { Box, Grid, Container, Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { BolsasCapesCard } from './components/BolsasCapesCard'
import { BolsasFapesbCard } from './components/BolsasFapesbCard'
import { BolsasCnpqCard } from './components/BolsasCnpqCard'
import { TotalBolsasCard } from './components/TotalBolsasCard'
import { DetalhamentoBolsasChart } from './components/DetalhamentoBolsasChart'
import { DetalhamentoAlunosChart } from './components/DetalhamentoAlunosChart'

function DashboardMetricasView() {
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Container maxWidth={false} disableGutters>
              <Grid container>
                <Grid xs={12} sm={6} lg={3} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                  <BolsasCapesCard difference={12} positive sx={{ height: '100%' }} value="24" />
                </Grid>
                <Grid xs={12} sm={6} lg={3} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                  <BolsasFapesbCard difference={12} sx={{ height: '100%' }} value="24" />
                </Grid>
                <Grid xs={12} sm={6} lg={3} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                  <BolsasCnpqCard difference={12} positive sx={{ height: '100%' }} value="24" />
                </Grid>
                <Grid xs={12} sm={6} lg={3} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                  <TotalBolsasCard difference={12} positive sx={{ height: '100%' }} value="24" />
                </Grid>
                <Grid xs={12} lg={8} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
                  <DetalhamentoBolsasChart
                    difference={12}
                    positive
                    sx={{ height: '100%' }}
                    value="24"
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} sx={{ marginBottom: '1rem', paddingRight: '1rem' }}>
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
        </div>
      </section>
    </div>
  )
}

export { DashboardMetricasView }
