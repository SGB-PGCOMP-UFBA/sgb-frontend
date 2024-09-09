import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Divider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import { SlideUp } from '../../../components/Transitions/SlideUp'
import MonetaryBrazilianValueMask from '../../../components/Masks/MonetaryBrazilianValueMask';
import { CpfInputMask } from '../../../components/Masks/CpfInputMask';
import { PhoneInputMask } from '../../../components/Masks/PhoneInputMask';

function DialogEdicaoBolsista({ item, isOpen, onClose, onSubmit, filterOptions }) {
  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = Object.fromEntries(data.entries())

    onSubmit({
      student_email: item.student.email,
      enrollment_id: item.enrollment.id,
      scholarship_id: item.id,
      ...entries
    })

    onClose()
  }

  const advisorsName = filterOptions.advisorNameFilterList.slice(1)
  const agenciesName = filterOptions.agencyNameFilterList.slice(1)

  const dialogContent = (
    <Box
      className="mt-2"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: {
          xs: '295px',
          sm: '295px',
          md: '395px',
        },
        maxWidth: {
          xs: '350px',
          sm: '350px',
          md: '695px',
        },
        gap: '1.5em',
      }}>
      <Box display="flex" flexDirection="column" width="100%">
        <Typography variant="subtitle1">
          Bolsista
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
              marginBottom: { xs: '0.6em', sm: '0.6em', md: '1em' },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: '0.6em',
              width: '100%',
              marginTop: '1.2em',
              '& > *': {
                marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
              },
            }}
          >
            <TextField
              id="input-student-name"
              label="Nome"
              name="student_name"
              variant="outlined"
              defaultValue={item.student.name}
              fullWidth
              inputProps={{ maxLength: 80 }}
            />
            <TextField
              id="input-student-link-to-lattes"
              label="Link do Lattes"
              name="student_link_to_lattes"
              variant="outlined"
              defaultValue={item.student.link_to_lattes}
              fullWidth
              inputProps={{ maxLength: 80 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: '0.6em',
              width: '100%',
              '& > *': {
                marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
              },
            }}
          >
            <TextField
              id="input-student-tax-id"
              label="CPF"
              name="student_tax_id"
              variant="outlined"
              defaultValue={item.student.tax_id}
              fullWidth
              InputProps={{
                inputComponent: CpfInputMask,
              }}
            />
            <TextField
              id="input-student-phone"
              label="Celular"
              name="student_phone_number"
              variant="outlined"
              defaultValue={item.student.phone_number}
              fullWidth
              InputProps={{
                inputComponent: PhoneInputMask,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" width="100%">
        <Typography variant="subtitle1">
          Matrícula
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
              marginBottom: { xs: '0.6em', sm: '0.6em', md: '1em' },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: '0.6em',
              width: '100%',
              marginTop: '1.2em',
              '& > *': {
                marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="label-curso">Curso</InputLabel>
              <Select
                id="select-curso"
                label="Curso"
                name="enrollment_program"
                labelId="label-curso"
                defaultValue={item.enrollment.enrollment_program}
              >
                <MenuItem value={"MESTRADO"}>Mestrado</MenuItem>
                <MenuItem value={"DOUTORADO"}>Doutorado</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Data de Matrícula"
              name="enrollment_date"
              defaultValue={new Date(item.enrollment.enrollment_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
            <DatePicker
              label="Data de Previsão de Defesa"
              name="defense_prediction_date"
              defaultValue={new Date(item.enrollment.defense_prediction_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="label-orientador">Orientador</InputLabel>
              <Select
                id="select-orientador"
                label="Orientador"
                name="advisor_email"
                labelId="label-orientador"
                defaultValue={item.advisor.email}
              >
                {advisorsName.map((advisor) => (
                  <MenuItem key={advisor.key} value={advisor.email}>
                    {advisor.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle1">
          Bolsa
        </Typography>
        <Divider />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '1.2em',
          '& > *': {
            marginBottom: { xs: '0.6em', sm: '0.6em', md: '1em' },
          },
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
            gap: '0.4em',
            '& > *': {
              marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
            },
          }}>
            <FormControl fullWidth>
              <InputLabel id="label-agencia">Agência</InputLabel>
              <Select
                id="select-agencia"
                label="Agência"
                name="agency_id"
                labelId="label-agencia"
                defaultValue={item.agency.id}
              >
                {agenciesName.map((agency) => (
                  <MenuItem key={agency.key} value={agency.id}>
                    {agency.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="label-status">Situação</InputLabel>
              <Select
                id="select-status"
                label="Situação"
                name="status"
                labelId="label-status"
                defaultValue={item.status}
              >
                <MenuItem value={"ON_GOING"}>Em Andamento</MenuItem>
                <MenuItem value={"EXTENDED"}>Prazo Extendido</MenuItem>
                <MenuItem value={"FINISHED"}>Finalizado</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="input-salary"
              label="Valor da Bolsa"
              name="salary"
              variant="outlined"
              defaultValue={item.salary !== null ? item.salary : "0,00"}
              InputProps={{
                inputComponent: MonetaryBrazilianValueMask,
              }}
              fullWidth
              inputProps={{ maxLength: 14 }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
            gap: '0.4em',
            '& > *': {
              marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
            },
          }}>
            <DatePicker
              label="Data de Início da Bolsa"
              name="scholarship_starts_at"
              defaultValue={new Date(item.scholarship_starts_at)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
            <DatePicker
              label="Data de Término da Bolsa"
              name="scholarship_ends_at"
              defaultValue={new Date(item.scholarship_ends_at)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
            <DatePicker
              label="Data de Extensão da Bolsa"
              name="extension_ends_at"
              minDate={new Date(item.scholarship_ends_at)}
              defaultValue={item.extension_ends_at !== null ? new Date(item.extension_ends_at) : null}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" autoFocus variant="contained" color="success" size="small">
        Salvar
      </Button>
    </div>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUp}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => submitAndCloseDialog(event)
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Editar Bolsista - <b>{item.student.name}</b></DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoBolsista }
