import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Box, FormControl, InputLabel, Select, MenuItem, Grid, TextField } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'
import MonetaryBrazilianValueMask from '../../../components/Masks/MonetaryBrazilianValueMask';

function DialogInclusaoBolsa(props) {
  const { isOpen, onSubmit, onClose, agencies, allocations, enrollment } = props

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
      enrollment_number: enrollment.enrollment_number,
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
              name="agency_name"
              labelId="label-agency"
              defaultValue={""}
              placeholder="Selecione uma agência"
            >
              <MenuItem disabled value={""}>Selecione uma agência</MenuItem>
              {agencies.map((agency) => (
                <MenuItem key={agency.key} value={agency.value}>
                  {agency.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="input-salary"
            label="Valor da Bolsa"
            name="salary"
            variant="outlined"
            defaultValue="0,00"
            InputProps={{
              inputComponent: MonetaryBrazilianValueMask,
            }}
            fullWidth
            inputProps={{ maxLength: 14 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Início da Bolsa"
            name="scholarship_starts_at"
            defaultValue={null}
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
            defaultValue={null}
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
          <FormControl required fullWidth>
            <InputLabel id="label-allocation">Alocação</InputLabel>
            <Select
              id="select-allocation"
              label="allocation"
              name="allocation_name"
              labelId="label-allocation"
              defaultValue={""}
              placeholder="Selecione uma alocação"
            >
              <MenuItem disabled value={""}>Selecione uma alocação</MenuItem>
              {allocations.map((allocation) => (
                <MenuItem key={allocation.key} value={allocation.value}>
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
      <DialogTitle>Incluir Bolsa (Matrícula {enrollment.enrollment_number} - {enrollment.enrollment_program})</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogInclusaoBolsa }
