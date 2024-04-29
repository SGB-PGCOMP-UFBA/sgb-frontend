import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

const LITERAL_ON_GOING = 'ON_GOING'

function CardBolsasFapesbView(props) {
  const { data, sx } = props

  const total_count = Object.values(data).reduce((acc, currentValue) => {
    const valor = parseInt(currentValue.count)
    return acc + (isNaN(valor) ? 0 : valor)
  }, 0)

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              FAPESB
            </Typography>
            <Typography variant="h4">
              {data[LITERAL_ON_GOING].count}
              <div>
                <Typography variant="subtitle2">bolsas em andamento</Typography>
              </div>
            </Typography>
          </Stack>
          <Avatar
            className="bg-yellow-400 !bg-yellow-400"
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon sx={{ fontSize: 32 }}>work_outline</Icon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" sx={{ mt: 2 }}>
          <Typography
            color="text.secondary"
            variant="caption"
            lineHeight={0}
            sx={{ marginLeft: 0.5 }}
            fontWeight="bold"
          >
            {total_count} bolsas desde o começo do programa
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

CardBolsasFapesbView.prototypes = {
  sx: PropTypes.node,
  data: PropTypes.node.isRequired
}

export { CardBolsasFapesbView }
