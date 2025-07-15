import { Box, Grid, Container, Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'
import { PieChartBolsasMestrado } from './components/charts/PieChartBolsasMestrado'
import { PieChartBolsasDoutorado } from './components/charts/PieChartBolsasDoutorado'
import { CardBolsasCapes } from './components/cards/CardBolsasCapes'
import { CardBolsasCnpq } from './components/cards/CardBolsasCnpq'
import { CardBolsasFapesb } from './components/cards/CardBolsasFapesb'
import { ColumnChartHistogramaBolsas } from './components/charts/ColumnChartHistogramaBolsas'
import { TableTotalBolsasPorAgencia } from './components/tables/TableTotalBolsasPorAgencia'
import { AgencyNames } from 'constants/AgencyNames'

function DashboardMetricasView() {
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
                <p className="poppins font-medium text-gray-500">Gráficos e Métricas</p>
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
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <CardBolsasCapes sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <CardBolsasCnpq sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={2}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <CardBolsasFapesb sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={6}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <TableTotalBolsasPorAgencia sx={{ height: '100%' }} />
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
                      <PieChartBolsasMestrado sx={{ height: '100%' }} scholarshipStatus={"FINISHED"} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <PieChartBolsasDoutorado sx={{ height: '100%' }} scholarshipStatus={"FINISHED"} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                    >
                      <ColumnChartHistogramaBolsas sx={{ height: '100%' }} />
                    </Grid>
                    {Object.values(AgencyNames).map((agencyName) => {
                      return (
                        <Grid
                          key={`ColumnChartHistograma_${agencyName}`}
                          item
                          xs={12}
                          md={6}
                          lg={6}
                          sx={{ marginBottom: '1rem', paddingRight: '1rem' }}
                        >
                          <ColumnChartHistogramaBolsas sx={{ height: '100%' }} agencyName={agencyName} />
                        </Grid>
                      )
                    })}
                  </Grid>
                </Container>
              </Box>
          </div>
        </section>
      </div>
    </div>
  )
}

export { DashboardMetricasView }
