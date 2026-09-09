import { Avatar, Card, CardContent, Stack, Typography, Icon } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import type { CountByAgencyAndStatus } from '../../../../../api/scholarship'

const LITERAL_ON_GOING = 'ON_GOING'

export interface CardBolsasCapesViewProps {
  sx?: SxProps<Theme>
  /** Contagens da agencia por status: `{ [status]: { count } }`. */
  data: CountByAgencyAndStatus[string]
  isLoading: boolean
}

function CardBolsasCapesView(props: CardBolsasCapesViewProps) {
  const { data, sx } = props

  const total_count = Object.values(data).reduce((acc, currentValue) => {
    const valor = parseInt(String(currentValue.count))
    return acc + (isNaN(valor) ? 0 : valor)
  }, 0)

  return (
    <Card sx={sx}>
      <CardContent className="flex flex-col w-full h-full justify-between">
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3} marginBottom={2}>
          <Stack marginBottom={2}>
            <Typography color="text.primary" fontWeight="bold" variant="h5" marginBottom={5}>
              CAPES
            </Typography>
            <Typography variant="h4">{data[LITERAL_ON_GOING]?.count || 0}</Typography>
            <Typography variant="subtitle1">bolsas alocadas</Typography>
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
        <Stack alignItems="center" justifyContent="end" direction="row">
        <Typography color="text.primary" variant="caption" fontWeight="bold">
            {total_count}&nbsp;
          </Typography>
          <Typography color="text.primary" variant="caption">
            bolsas desde o início
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export { CardBolsasCapesView }
