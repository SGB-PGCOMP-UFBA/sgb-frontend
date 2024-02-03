import PropTypes from 'prop-types'
import { Card, CardContent, Stack, Typography } from '@mui/material'

function TotalBolsasCard(props) {
  const { data, sx } = props

  return (
    <Card sx={sx} className="bg-blue-400 !bg-blue-400">
      <CardContent className="h-full">
        <Stack className="h-full" alignItems="center" direction="column">
          <Stack justifyContent="space-evenly" alignItems="center" height="100%">
            <Typography fontWeight="bold" variant="h3" sx={{ color: '#fff' }}>
              TOTAL
            </Typography>
            <Typography textAlign="center" variant="h3" sx={{ color: '#fff' }}>
              {data}
              <div>
                <Typography variant="subtitle1">bolsas ativas</Typography>
              </div>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

TotalBolsasCard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.node,
  value: PropTypes.string.isRequired
}

export { TotalBolsasCard }
