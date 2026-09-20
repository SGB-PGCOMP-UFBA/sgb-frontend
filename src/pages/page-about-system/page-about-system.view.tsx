import { Link } from 'react-router-dom'
import { PublicPageLayout } from '@/components/public-page-layout'

function PageAboutSystemView() {
  return (
    <PublicPageLayout subtitle="Informações Sobre o Sistema">
      <div className="mb-12 mt-12 flex flex-col items-center text-justify">
        <div className="space-y-4">
          <p>
            Este sistema foi disponibilizado por <b>Hérson Reis Rezende dos Santos (herson.reis@ufba.br)</b> como trabalho de conclusão de curso do Bacharelado em Ciência da Computação da Universidade Federal da Bahia.
          </p>
          <p>
            Seu objetivo é facilitar o gerenciamento de bolsas de estudo do Programa de <b>Pós-Graduação</b> em <b>Ciência da Computação</b> da <b>UFBA</b>,
            permitindo que discentes possam realizar consultas e acompanhar o progresso de suas bolsas de estudo, mantendo assim um histórico
            de atividades que pode ser utilizado pelos gestores do sistema para avaliação e tomada de decisões acerca do programa.
          </p>
          <p>
            <b>Repositório e documentações</b> disponíveis
            <a href="https://github.com/SGB-PGCOMP-UFBA" className="text-base font-normal text-blue-600 transition-colors hover:text-blue-800" target="_blank" rel="noreferrer">
              {' '} aqui.
            </a>
          </p>
          <p>
            Orientador: <b>Frederico Araújo Durão (fdurao@ufba.br)</b>
          </p>
        </div>
        <Link to="/" className="mt-20 text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
          Voltar!
        </Link>
      </div>
    </PublicPageLayout>
  )
}

export { PageAboutSystemView }
