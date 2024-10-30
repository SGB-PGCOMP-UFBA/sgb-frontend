import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Box, FormControl, InputLabel, Select, MenuItem, Grid, OutlinedInput } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogEdicaoMatricula(props) {
  const { isOpen, onSubmit, onClose, advisors, item } = props

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
      enrollment_id: item.id,
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
            <InputLabel id="label-enrollment_number">Número de Matrícula</InputLabel>
            <OutlinedInput
              id="enrollment_number"
              label="Número de Matrícula"
              name="enrollment_number"
              placeholder="Digite a sua matrícula"
              type="tel"
              defaultValue={item.enrollment_number.trim()}
              inputProps={{
                minLength: "9",
                maxLength: "10",
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="label-curso">Curso</InputLabel>
            <Select
              id="select-curso"
              label="Curso"
              name="enrollment_program"
              labelId="label-curso"
              defaultValue={item.enrollment_program}
            >
              <MenuItem value={"MESTRADO"}>Mestrado</MenuItem>
              <MenuItem value={"DOUTORADO"}>Doutorado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl required fullWidth>
            <InputLabel id="label-orientador">Orientador</InputLabel>
            <Select
              id="select-orientador"
              label="Orientador"
              name="advisor_email"
              labelId="label-orientador"
              defaultValue={item.advisor.email}
            >
              {advisors.map((advisor) => (
                <MenuItem key={advisor.key} value={advisor.email}>
                  {advisor.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Matrícula"
            name="enrollment_date"
            defaultValue={new Date(item.enrollment_date)}
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
            label="Data de Previsão de Defesa"
            name="defense_prediction_date"
            minDate={minEndDate}
            defaultValue={new Date(item.defense_prediction_date)}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                InputLabelProps: { shrink: true }
              }
            }}
          />
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
      <DialogTitle>Editar Matrícula</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoMatricula }
