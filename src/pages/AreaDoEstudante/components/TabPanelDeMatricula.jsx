import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from '@mui/x-date-pickers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import { DialogExclusaoMatricula } from './DialogExclusaoMatricula'
import { AddCircleOutline } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'
import { DialogInclusaoBolsa } from './DialogInclusaoBolsa'
import { DialogExclusaoBolsa } from './DialogExclusaoBolsa'
import MonetaryBrazilianValueMask from '../../../components/Masks/MonetaryBrazilianValueMask'
import { CustomChip } from '../../../components'
import { toPascalCase } from '../../../helpers/formatters'

function TabPanelDeMatricula(props) {
  const { enrollment, agencies } = props
  const [scholarship, setScholarship] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [isDialogForDeleteEnrollmentOpen, setIsDialogForDeleteEnrollmentOpen] = useState(false)
  const [isDialogForDeleteScholarshipOpen, setIsDialogForDeleteScholarshipOpen] = useState(false)
  const [isDialogForCreateScholarshipOpen, setIsDialogForCreateScholarshipOpen] = useState(false)
  const scholarships = enrollment.scholarships.sort((a, b) => a.id - b.id)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleDialogForDeleteEnrollmentClose = () => {
    setIsDialogForDeleteEnrollmentOpen(false)
  }

  const handleDialogForDeleteEnrollmentOpen = () => {
    setIsDialogForDeleteEnrollmentOpen(true)
  }

  const handleDialogForDeleteScholarshipClose = () => {
    setIsDialogForDeleteScholarshipOpen(false)
  }

  const handleDialogForDeleteScholarshipOpen = (scholarship) => {
    setIsDialogForDeleteScholarshipOpen(true)
    setScholarship(scholarship)
  }

  const handleDialogForCreateScholarshipClose = () => {
    setIsDialogForCreateScholarshipOpen(false)
    setScholarship({})
  }

  const handleDialogForCreateScholarshipOpen = () => {
    setIsDialogForCreateScholarshipOpen(true)
  }

  return (
    <Box width="100%">
      <Box component="form" onSubmit={() => { }} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              type="tel"
              fullWidth
              id="enrollment_number"
              label="Matrícula"
              name="enrollment_number"
              defaultValue={enrollment.enrollment_number.trim()}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              fullWidth
              id="enrollment_program"
              label="Curso"
              name="enrollment_program"
              defaultValue={toPascalCase(enrollment.enrollment_program)}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <DatePicker
              readOnly
              label="Data da Matrícula"
              name="enrollment_date"
              defaultValue={new Date(enrollment.enrollment_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <DatePicker
              readOnly
              label="Data de Previsão da Defesa"
              name="defense_prediction_date"
              defaultValue={new Date(enrollment.defense_prediction_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              fullWidth
              id="advisor_name"
              label="Orientador"
              name="advisor_name"
              defaultValue={enrollment.advisor.name}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              fullWidth
              id="advisor_email"
              label="E-mail do Orientador"
              name="advisor_email"
              defaultValue={enrollment.advisor.email}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              fullWidth
              id="advisor_phone_number"
              label="Celular do Orientador"
              name="advisor_phone_number"
              defaultValue={enrollment.advisor.phone_number ? enrollment.advisor.phone_number : "Não informado"}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={2} lg={2}>
            <TextField
              fullWidth
              id="advisor_status"
              label="Situação do Orientador"
              name="advisor_status"
              defaultValue={enrollment.advisor.status === 'ACTIVE' ? 'Em exercício' : 'Inativo'}
              inputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1} md={1} lg={8} gap={2} display="flex" alignItems="center" justifyContent="flex-end">
            <Tooltip title="Excluir Matrícula">
              <IconButton onClick={handleDialogForDeleteEnrollmentOpen}>
                <Icon sx={{ fontSize: 28 }}>delete</Icon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', marginTop: 4, padding: 2 }}>
        <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
          <Typography variant="body1" marginBottom="0.6rem" sx={{ fontWeight: '700' }}>Bolsas Recebidas</Typography>
          <Box display="flex" flexDirection="row" sx={{ gap: 2 }}>
            <Tooltip title="A edição de bolsas está temporariamente desabilitada. Caso precise realizar algum ajuste, remova a bolsa e cadastre-a novamente.">
              <IconButton color='info'>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutline />}
              onClick={handleDialogForCreateScholarshipOpen}
            >
              Nova Bolsa
            </Button>
          </Box>
        </Box>

        {scholarships.length === 0 ? (
          <Typography variant="subtitle2" align="center">Parece que você não tem nenhuma bolsa vinculada a esta matrícula!</Typography>
        ) : (
          scholarships.map((scholarship, index) => (
            <Box key={index} component="form" onSubmit={() => { }} marginBottom={0.6}>
              <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary sx={{ display: "flex", alignItems: "center" }} expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" flexDirection="row" alignItems="center" sx={{ gap: 4 }} >
                    <Typography sx={{ flexShrink: 0 }}>Bolsa {index + 1}</Typography>
                    <Typography sx={{ flexShrink: 0, color: 'text.secondary' }}> Agência de Fomento {scholarship.agency.name}</Typography>
                    <CustomChip value={scholarship.status} type="status" />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3} lg={2}>
                        <FormControl fullWidth>
                          <InputLabel id="label-agencia">Agência</InputLabel>
                          <Select
                            id="select-agencia"
                            label="Agência"
                            name="agency_id"
                            labelId="label-agencia"
                            defaultValue={scholarship.agency.id}
                            readOnly
                          >
                            {agencies.map((agency) => (
                              <MenuItem key={agency.key} value={agency.id}>
                                {agency.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={2}>
                        <DatePicker
                          readOnly
                          label="Data de Início da Bolsa"
                          name="scholarship_starts_at"
                          defaultValue={new Date(scholarship.scholarship_starts_at)}
                          slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={2}>
                        <DatePicker
                          readOnly
                          label="Data de Término da Bolsa"
                          name="scholarship_ends_at"
                          defaultValue={new Date(scholarship.scholarship_ends_at)}
                          slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={2}>
                        <DatePicker
                          readOnly
                          label="Bolsa Extentida Até"
                          name="extension_ends_at"
                          minDate={new Date(scholarship.extension_ends_at)}
                          defaultValue={scholarship.extension_ends_at !== null ? new Date(scholarship.extension_ends_at) : null}
                          slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={2}>
                        <TextField
                          id="input-salary"
                          label="Valor da Bolsa"
                          name="salary"
                          variant="outlined"
                          defaultValue={scholarship.salary !== null ? scholarship.salary : "0,00"}
                          InputProps={{
                            inputComponent: MonetaryBrazilianValueMask,
                          }}
                          fullWidth
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={2} gap={2} display="flex" alignItems="center" justifyContent="flex-end">
                        <Tooltip title="Excluir Bolsa">
                          <IconButton onClick={() => handleDialogForDeleteScholarshipOpen(scholarship)}>
                            <Icon sx={{ fontSize: 28 }}>delete</Icon>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))
        )}
      </Box>

      {isDialogForCreateScholarshipOpen && (
        <DialogInclusaoBolsa
          enrollment={enrollment}
          isOpen={isDialogForCreateScholarshipOpen}
          onClose={handleDialogForCreateScholarshipClose}
          onSubmit={props.onCreateNewScholarship}
          agencies={props.agencies}
        />
      )}

      {isDialogForDeleteScholarshipOpen && (
        <DialogExclusaoBolsa
          isOpen={isDialogForDeleteScholarshipOpen}
          onClose={handleDialogForDeleteScholarshipClose}
          onSubmit={props.onDeleteScholarship}
          scholarship={scholarship}
        />
      )}

      {isDialogForDeleteEnrollmentOpen && (
        <DialogExclusaoMatricula
          isOpen={isDialogForDeleteEnrollmentOpen}
          onClose={handleDialogForDeleteEnrollmentClose}
          onSubmit={props.onDeleteEnrollment}
          enrollment={enrollment}
        />
      )}

    </Box>
  )
}

TabPanelDeMatricula.prototypes = {
  enrollment: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

export { TabPanelDeMatricula }
