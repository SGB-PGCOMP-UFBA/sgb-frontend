import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Box, FormControl, InputLabel, Select, MenuItem, Grid, TextField } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'
import MonetaryBrazilianValueMask from '../../../components/Masks/MonetaryBrazilianValueMask';

function DialogEdicaoBolsa(props) {
  const { isOpen, onSubmit, onClose, agencies, allocations, item } = props

  const [minEndDate, setMinEndDate] = useState(null)

  const handleStartDateChange = (newDate) => {
    setMinEndDate(newDate)
  }

  const submitAndCloseDialog = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const entries = Object.fromEntries(data.entries())

    onSubmit({
      ...entries,
      agency_id: entries.agency_id,
      scholarship_id: item.id,
      enrollment_id: item.enrollment_id,
      student_email: item.student_email,
    })
    onClose()
  }

  const dialogContent = (
    <Box
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
        paddingTop: '1rem'
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="label-agency">Agência</InputLabel>
            <Select
              id="select-agency"
              label="agency"
              name="agency_id"
              labelId="label-agency"
              defaultValue={item.agency.id}
              placeholder="Selecione uma agência"
            >
              <MenuItem disabled value={""}>Selecione uma agência</MenuItem>
              {agencies.map((agency) => (
                <MenuItem key={agency.id} value={agency.id}>
                  {agency.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Início da Bolsa"
            name="scholarship_starts_at"
            defaultValue={new Date(item.scholarship_starts_at)}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                InputLabelProps: { shrink: true }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Término da Bolsa"
            name="scholarship_ends_at"
            minDate={minEndDate}
            defaultValue={new Date(item.scholarship_ends_at)}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                InputLabelProps: { shrink: true }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Extensão da Bolsa"
            name="extension_ends_at"
            minDate={new Date(item.scholarship_ends_at)}
            defaultValue={item.extension_ends_at !== null ? new Date(item.extension_ends_at) : null}
            slotProps={{
              textField: {
                fullWidth: true,
                InputLabelProps: { shrink: true }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="label-allocation">Alocação</InputLabel>
            <Select
              id="select-allocation"
              label="allocation"
              name="allocation_id"
              labelId="label-allocation"
              defaultValue={item.allocation ? item.allocation.id : allocations[0].id}
              placeholder="Selecione uma alocação"
            >
              <MenuItem disabled value={""}>Selecione uma alocação</MenuItem>
              {allocations.map((allocation) => (
                <MenuItem key={allocation.id} value={allocation.id}>
                  {allocation.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" variant="contained" color="success" size="small">
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
      <DialogTitle>Editar Bolsa (Matrícula {item.enrollment_number.trim()} - {item.enrollment_program})</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoBolsa }
