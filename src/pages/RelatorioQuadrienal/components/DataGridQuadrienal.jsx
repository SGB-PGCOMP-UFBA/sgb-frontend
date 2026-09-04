import PropTypes from 'prop-types'

import './styles.css'
import { Divider, Grid, Typography } from '@mui/material'
import Description from '@mui/icons-material/Description'
function DataGridQuadrienal({ data }) {
  const StatusRow = ({ label, counts }) => (
    <div className='flex justify-between border-b border-gray-50 py-1 last:border-0'>
      <Typography variant='body2' className='font-medium text-gray-600'>
        {label}:
      </Typography>
      <Typography variant='body2' className='text-gray-800'>
        {counts.masters} Mestrado | {counts.phd} Doutorado
        <span className='ml-2 font-bold text-blue-600'>
          (Total: {counts.masters + counts.phd})
        </span>
      </Typography>
    </div>
  )

  return (
    <div>
      <div className='space-y-6'>
        <Typography
          variant='h6'
          className='flex items-center gap-2 text-gray-700'
        >
          <Description color='action' /> Detalhamento por Agência de Fomento
        </Typography>

        <Grid container spacing={3}>
          {data.map(agency => (
            <Grid item xs={12} md={6} key={agency.agencyName}>
              <div className='rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-shadow hover:shadow-md'>
                <div className='mb-3 flex items-center justify-between'>
                  <Typography
                    variant='h5'
                    className='font-bold text-orange-600'
                  >
                    {agency.agencyName}
                  </Typography>
                  <div className='text-right'>
                    <Typography
                      variant='caption'
                      className='block uppercase text-gray-500'
                    >
                      Total Geral
                    </Typography>
                    <Typography variant='h6' className='font-bold'>
                      {agency.scholarshipsTotal}
                    </Typography>
                    <Typography
                      variant='caption'
                      className='text-xs text-gray-400'
                    >
                      (M: {agency.totalMasters} | D: {agency.totalPhd})
                    </Typography>
                  </div>
                </div>

                <Divider className='mb-4' />

                <div className='space-y-2'>
                  <StatusRow
                    label='Bolsas Concluídas'
                    counts={agency.finishedCount}
                  />
                  <StatusRow
                    label='Bolsas em Andamento'
                    counts={agency.onGoingCount}
                  />
                  <StatusRow
                    label='Bolsas Ativas'
                    counts={agency.activeCount}
                  />
                  <StatusRow
                    label='Bolsas Prorrogadas'
                    counts={agency.extendedCount}
                  />
                  <StatusRow
                    label='Bolsas Inativas'
                    counts={agency.inactiveCount}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

DataGridQuadrienal.propTypes = {
  data: PropTypes.array,
}

export { DataGridQuadrienal }
