import React, { useRef, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Divider, Box, TextField, Typography } from '@mui/material'
import { SlideUp } from '../../../components/Transitions/SlideUp'
import { DatePicker } from '@mui/x-date-pickers';
import { toPascalCase } from '../../../helpers/formatters';

function DialogVisualizacaoBolsas({ item, isOpen, onClose }) {
  const descriptionElementRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isOpen])

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
      {item.enrollments.map((enrollment, index) => (
        <Box key={index} display="flex" flexDirection="column" width="100%">
          <Typography variant="subtitle1" fontWeight="600">
            Matrícula - {enrollment.enrollment_number.trim()}
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
                inputProps={{ readOnly: true }}
                fullWidth
                label="Curso"
                name="enrollment_program"
                variant="outlined"
                defaultValue={toPascalCase(enrollment.enrollment_program)}
              />
              <DatePicker
                readOnly
                label="Data de Matrícula"
                name="enrollment_date"
                defaultValue={new Date(enrollment.enrollment_date)}
                slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
              />
              <DatePicker
                readOnly
                label="Data de Previsão de Defesa"
                name="defense_prediction_date"
                defaultValue={enrollment.defense_prediction_date !== null ? new Date(enrollment.defense_prediction_date) : null}
                slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
              />
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">
                Bolsas
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '0.2em',
                '& > *': {
                  marginBottom: { xs: '0.6em', sm: '0.6em', md: '1em' },
                },
                border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', padding: '1em'
              }}>
                {enrollment.scholarships.map((scholarship, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6em',
                    width: '100%',
                    marginTop: '0.2em',
                    marginBottom: `${index === enrollment.scholarships.length - 1 ? '0' : '2em'}`,
                    '& > *': {
                      marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
                    },
                  }}>
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
                        marginTop: '0.2em',
                        '& > *': {
                          marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
                        },
                      }}
                    >
                      <TextField
                        inputProps={{ readOnly: true }}
                        fullWidth
                        label="Agência de Fomento"
                        name="enrollment_program"
                        variant="outlined"
                        defaultValue={scholarship.agency.name}
                      />
                      <TextField
                        inputProps={{ readOnly: true }}
                        fullWidth
                        label="Situação"
                        name="enrollment_program"
                        variant="outlined"
                        defaultValue={scholarship.status === 'ON_GOING' ? 'Em Andamento' : scholarship.status === 'FINISHED' ? 'Finalizada' : 'Extendida'}
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
                        marginTop: '0.2em',
                        '& > *': {
                          marginBottom: { xs: '0.6em', sm: '0.6em', md: 0 },
                        },
                      }}
                    >
                      <DatePicker
                        readOnly
                        label="Data de Início da Bolsa"
                        name="scholarship_starts_at"
                        defaultValue={new Date(scholarship.scholarship_starts_at)}
                        slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                      />
                      <DatePicker
                        readOnly
                        label="Data de Término da Bolsa"
                        name="scholarship_ends_at"
                        defaultValue={scholarship.scholarship_ends_at !== null ? new Date(scholarship.scholarship_ends_at) : null}
                        slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Voltar
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose} scroll={'paper'} TransitionComponent={SlideUp}>
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
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogVisualizacaoBolsas }
