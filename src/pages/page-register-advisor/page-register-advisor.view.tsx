import { Link } from 'react-router-dom'
import { PublicPageLayout } from '@/components/public-page-layout'

function PageRegisterAdvisorView() {
  return (
    <PublicPageLayout subtitle="Acesso de Orientadores">
      <div className="mb-12 mt-12 flex flex-col items-center text-justify">
        <div className="space-y-4">
          <p>
            Se você orienta ou já orientou algum discente no Programa de Pós-Graduação em Ciência da Computação, provavelmente você já possui um cadastro realizado com o e-mail da instituição.
            Se for o caso e você não lembra a sua senha ou não a recebeu por e-mail, tente recuperá-la.
          </p>
          <p>
            Se for a sua primeira vez orientando um discente no Programa de Pós-Graduação em Ciência da Computação, contate um dos administradores para que realizem o seu cadastro.
            Neste caso, você receberá uma mensagem via e-mail com instruções de acesso.
          </p>
          <p>
            Caso ainda tenha alguma dúvida ou esteja com algum problema no seu acesso, contate um administrador do sistema para mais informações.
          </p>
        </div>
        <Link to="/" className="mt-20 text-base font-normal text-blue-600 transition-colors hover:text-blue-800">
          Voltar!
        </Link>
      </div>
    </PublicPageLayout>
  )
}

export { PageRegisterAdvisorView }
