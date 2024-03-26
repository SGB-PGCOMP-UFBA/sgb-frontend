import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, Stack, Typography, Icon, Tooltip } from '@mui/material'

function BolsasCapesCard(props) {
  const { data, sx } = props

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1} marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={2}>
              CAPES
            </Typography>
            <Typography variant="h4">
              {data.count}
              <div>
                <Typography variant="subtitle2">bolsas ativas no total</Typography>
              </div>
            </Typography>
          </Stack>
          <Avatar
            className="bg-gray-400 !bg-gray-400"
            sx={{
              height: 56,
              width: 56
            }}
          >
            <Icon sx={{ fontSize: 32 }}>work_outline</Icon>
          </Avatar>
        </Stack>
        {data.growthOverLastYear >= 0 && (
          <Tooltip
            title={`No ano passado havia ${data.lastYearAmount} bolsa(s) ativa(s). Neste ano há ${data.currentYearAmount} bolsa(s) ativa(s).`}
          >
            <Stack alignItems="center" direction="row" sx={{ mt: 2 }}>
              <Stack alignItems="center" direction="row" spacing={0.5}>
                <Icon
                  color={data.growthOverLastYear >= 0 ? 'success' : 'error'}
                  sx={{ fontSize: 24 }}
                >
                  {data.growthOverLastYear >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </Icon>
                <Typography
                  color={data.growthOverLastYear >= 0 ? 'success.main' : 'error.main'}
                  variant="body2"
                >
                  {data.growthOverLastYear}%
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
          </Tooltip>
        )}
      </CardContent>
    </Card>
  )
}

BolsasCapesCard.prototypes = {
  sx: PropTypes.node,
  data: PropTypes.node.isRequired
}

export { BolsasCapesCard }
