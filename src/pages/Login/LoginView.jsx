import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box, Grid, Step, StepLabel, Stepper } from '@mui/material'

function LoginView(props) {
  const { onFormChoose, onSubmit, steps, activeStep, onStepBack, onStepNext } = props

  return (
    <div className="flex h-screen w-full items-center justify-center p-6 md:p-0">
      <section className="flex w-full flex-col items-center justify-center gap-y-7 md:w-11/12 lg:w-6/12">
        <img src="/assets/pgcomp_1.png" alt="Logo" className="w-full max-w-[220px]" />
        <h1 className="max-w-[395px] text-center font-poppins text-xl font-semibold leading-7 text-gray-900 md:w-11/12 lg:w-6/12">
          Sistema de acompanhamento
          <br />
          de bolsistas
        </h1>
        <Box sx={{ minWidth: '20vw', minHeight: '30vh', padding: 2 }}>
          <Stepper activeStep={activeStep} orientation="horizontal" className="pb-6">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Grid item xs={12} sx={{ padding: '20px', width: '100%' }}>
              {onFormChoose(activeStep)}
            </Grid>
            <Grid item xs={12}>
              <Button className="!mr-4" disabled={activeStep === 0} onClick={onStepBack}>
                Voltar
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={onSubmit}>
                  Entrar
                </Button>
              ) : (
                <Button variant="contained" onClick={onStepNext}>
                  Próximo
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        <div className="flex flex-col items-center justify-center pt-4">
          <p className="text-center text-base font-normal leading-6">
            Ainda não tem uma conta?{' '}
            <a href="/#" className="text-blue-600 transition-colors hover:text-blue-800">
              Cadastre-se
            </a>
          </p>
          <Link to="/esqueci-a-senha" className="text-base font-normal leading-6 text-blue-600">
            Esqueceu sua senha?
          </Link>
        </div>
      </section>
    </div>
  )
}

LoginView.prototypes = {
  onSubmit: PropTypes.node
}

export { LoginView }
