import { useCallback } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'

function SettingsNotificationsSection() {
  const handleSubmit = useCallback((event) => {
    event.preventDefault()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Card elevation={0} sx={{ border: 1, borderColor: '#e5e7eb' }}>
        <CardHeader subheader="Gerenciamento de Notificações" title="Notificações" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Notificações</Typography>
                <Stack>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="E-mail" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="SMS" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={1}>
                <Typography variant="h6">Mensagens</Typography>
                <Stack>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="E-mail" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="WhatsApp" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="SMS" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Salvar</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export { SettingsNotificationsSection }
