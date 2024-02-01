import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'

function BolsasFapesbCard(props) {
  const { difference, positive = false, sx, value } = props

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              FAPESB
            </Typography>
            <Typography variant="h4">
              {value}
              <Typography variant="subtitle2">bolsas alocadas</Typography>
            </Typography>
          </Stack>
          <Avatar
            className="bg-blue-400 !bg-blue-400"
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon sx={{ fontSize: 32 }}>work_outline</Icon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <Icon color={positive ? 'success' : 'error'} sx={{ fontSize: 24 }}>
                {positive ? 'arrow_upward' : 'arrow_downward'}
              </Icon>
              <Typography color={positive ? 'success.main' : 'error.main'} variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
              lineHeight={0}
              sx={{ marginLeft: 0.5 }}
              fontWeight="bold"
            >
              desde o último ano
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

BolsasFapesbCard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.node,
  value: PropTypes.string.isRequired
}

export { BolsasFapesbCard }
