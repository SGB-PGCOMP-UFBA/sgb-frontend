import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@mui/material'

function PageRegisterAdvisorView() {
  return (
    <Box className="flex h-full w-full p-5 md:p-10">
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/assets/pgcomp_1.png" alt="PGCOMP" className="max-w-[200px]" />
          <Typography component="h1" variant="h5" marginBottom="1.4em" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Sistema de Gerenciamento de Bolsas
          </Typography>
          <Typography component="h1" variant="h6">
            Advisor Sign Up
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" textAlign="justify" marginTop="3em" marginBottom="3em">
              <Grid item>
                <Typography component="h1" variant="subtitle1">
                  Se você orienta ou já orientou algum discente no Programa de Pós-Graduação em Ciência da Computação, provavelmente você já possui um cadastrado realizado com o e-mail da institução.
                  Se for o caso e você não lembra a sua senha ou não a recebeu por e-mail, tente recuperá-la.
                </Typography>
                <br/>
                <Typography component="h1" variant="subtitle1">
                  Se for a sua primeira vez orientando um discente no Programa de Pós-Graduação em Ciência da Computação, contate um dos administradores para que realizem o seu cadastro.
                  Neste caso, você receberá uma mensagem via e-mail com instruções de acesso.
                </Typography>
                <br/>
                <Typography component="h1" variant="subtitle1">
                  Caso ainda tenha alguma dúvida ou está com algum problema no seu acesso, contate um administrador do sistema para mais informações.
                </Typography>
              </Grid>
              <Grid item marginTop="5em">
                <Link to="/" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
                  Voltar!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export { PageRegisterAdvisorView }
