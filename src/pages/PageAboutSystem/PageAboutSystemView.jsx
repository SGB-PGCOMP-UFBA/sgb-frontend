import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@mui/material'

function PageAboutSystemView() {
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
            Informações Sobre o Sistema
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" textAlign="justify" marginTop="3em" marginBottom="3em">
              <Grid item>
                <Typography component="h1" variant="subtitle1">
                  Este sistema foi disponibilizado por <b>Hérson Reis Rezende dos Santos (herson.reis@ufba.br)</b> como trabalho de conclusão de curso do Bacharelado em Ciência da Computação da Universidade Federal da Bahia.
                </Typography>
                <br/>
                <Typography component="h1" variant="subtitle1">
                  Seu objetivo é facilitar o gerenciamento de bolsas de estudo do Programa de <b>Pós-Graduação</b> em <b>Ciência da Computação</b> da <b>UFBA</b>,
                  permitindo que discentes possam realizar consultas e acompanhar o progresso de suas bolsas de estudo, mantendo assim um histórico
                  de atividades que pode ser utilizado pelos gestores do sistema para avaliação e tomada de decisões acerca do programa.
                </Typography>
                <br/>
                <Typography component="h1" variant="subtitle1">
                  <b>Repositório e documentações</b> disponíveis
                  <a href="https://github.com/SGB-PGCOMP-UFBA" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800" target='_blank' rel='noreferrer'>
                    {' '} aqui.
                  </a>
                </Typography>
                <br/>
                <Typography component="h1" variant="subtitle1">
                  Orientador: <b>Frederico Araújo Durão (fdurao@ufba.br)</b>
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

export { PageAboutSystemView }
