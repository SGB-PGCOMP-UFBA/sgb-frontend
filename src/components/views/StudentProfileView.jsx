import React from 'react'
import { AppBar, Button, Card, Dialog, Divider, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { ExpandMore } from '@mui/icons-material'
import { SlideUp } from '../Transitions/SlideUp'
import { formatDate } from '../../helpers/formatters'

export default function StudentProfileView(props) {
  const { item, isOpen, onClose } = props

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={SlideUp}>
      <AppBar sx={{ backgroundColor: '#1C253F', position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {item.name}
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Voltar
          </Button>
        </Toolbar>
      </AppBar>
      <Card elevation={0} className="p-4">
        <Paper elevation={0} className="mb-4 p-6">
          <Typography className="pb-4" variant="h6" sx={{ fontWeight: 'bold' }}>
            Informações de Contato
            <Divider />
          </Typography>
          <Typography>
            <strong>Nome Completo:</strong> {item.name}
          </Typography>
          <Typography>
            <strong>E-mail:</strong> {item.email}
          </Typography>
          <Typography>
            <strong>Telefone:</strong>{' '}
            <a
              href={`https://wa.me/${item.phone_number.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.phone_number}
            </a>
          </Typography>
          <Typography>
            <strong>Link para Lattes:</strong>{' '}
            <a href={item.link_to_lattes} target="_blank" rel="noreferrer">
              {item.link_to_lattes}
            </a>
          </Typography>
        </Paper>
        <Paper elevation={0} className="mb-4 p-6">
          <Typography className="pb-4" variant="h6" sx={{ fontWeight: 'bold' }}>
            Matrículas no PGCOMP
            <Divider />
          </Typography>
          {item.enrollments ? (
            item.enrollments.map((enrollment) => (
              <Accordion key={enrollment.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>
                    {enrollment.enrollment_number} {' - '} {enrollment.enrollment_program}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{enrollment.defense_prediction_date}</AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>Nenhuma matrícula foi encontrada.</Typography>
          )}
        </Paper>
        <Paper elevation={0} className="mb-4 p-6">
          <Typography className="pb-4" variant="h6" sx={{ fontWeight: 'bold' }}>
            Artigos e Publicações
            <Divider />
          </Typography>
          {item.articles ? (
            item.articles.map((article) => (
              <Accordion key={article.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {article.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="pb-6" variant="body2">
                    {article.abstract}
                  </Typography>
                  <Typography variant="caption">
                    <a href={article.doi_link} target="_blank" rel="noreferrer">
                      Disponível em: <b>{article.doi_link}</b>
                    </a>
                    <br />
                    Publicado <b>{formatDate(article.publication_date)}</b> no(a){' '}
                    <b>{article.publication_place}</b>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>Nenhum artigo ou publicação foi encontrado.</Typography>
          )}
        </Paper>
      </Card>
    </Dialog>
  )
}
