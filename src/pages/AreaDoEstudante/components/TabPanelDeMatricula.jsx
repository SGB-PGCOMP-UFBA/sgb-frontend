import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from '@mui/x-date-pickers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import MonetaryBrazilianValueMask from '../../../components/Masks/MonetaryBrazilianValueMask'

function TabPanelDeMatricula(props) {
  const { enrollment, advisors, agencies } = props
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box width="100%">
      <Box component="form" onSubmit={() => { }} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              type="number"
              fullWidth
              id="enrollment_number"
              label="Matrícula"
              name="enrollment_number"
              onChange={() => { }}
              defaultValue={enrollment.enrollment_number}
              placeholder="Digite a sua matrícula"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="label-curso">Curso</InputLabel>
              <Select
                id="select-curso"
                label="Curso"
                name="enrollment_program"
                labelId="label-curso"
                defaultValue={enrollment.enrollment_program}
              >
                <MenuItem value={"MESTRADO"}>Mestrado</MenuItem>
                <MenuItem value={"DOUTORADO"}>Doutorado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <DatePicker
              label="Data da Matrícula"
              name="enrollment_date"
              defaultValue={new Date(enrollment.enrollment_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <DatePicker
              label="Data de Previsão da Defesa"
              name="defense_prediction_date"
              defaultValue={new Date(enrollment.defense_prediction_date)}
              slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="label-orientador">Orientador</InputLabel>
              <Select
                id="select-orientador"
                label="Orientador"
                name="advisor_email"
                labelId="label-orientador"
                defaultValue={enrollment.advisor.email}
              >
                {advisors.map((advisor) => (
                  <MenuItem key={advisor.email} value={advisor.email}>
                    {advisor.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} gap={2} display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Button onClick={() => { }} variant="text" color="info" size="small">
              Cancelar
            </Button>
            <Button type="submit" autoFocus variant="contained" color="primary" size="small">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box paddingTop="2rem">
        <Typography variant="body1" marginBottom="0.6rem" sx={{ fontWeight: '700' }}>Bolsas de Estudo</Typography>
        {enrollment.scholarships.map((scholarship, index) => (
          <Box key={index} component="form" onSubmit={() => { }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Vínculo de Bolsa {index + 1}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{scholarship.agency.name}</Typography>
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
                        label="Data de Início da Bolsa"
                        name="scholarship_starts_at"
                        defaultValue={new Date(scholarship.scholarship_starts_at)}
                        slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <DatePicker
                        label="Data de Término da Bolsa"
                        name="scholarship_ends_at"
                        defaultValue={new Date(scholarship.scholarship_ends_at)}
                        slotProps={{ textField: { fullWidth: true, InputLabelProps: { shrink: true } } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <DatePicker
                        label="Bolsa Extentida Até"
                        name="extension_ends_at"
                        minDate={new Date(scholarship.extension_ends_at)}
                        defaultValue={new Date(scholarship.extension_ends_at)}
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2} gap={2} display="flex" alignItems="flex-end" justifyContent="flex-end">
                      <Button onClick={() => { }} variant="text" color="info" size="small">
                        Cancelar
                      </Button>
                      <Button type="submit" autoFocus variant="contained" color="primary" size="small">
                        Salvar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
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
