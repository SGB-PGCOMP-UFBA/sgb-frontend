import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/helpers/formatters'
import type { StudentDetailedWithFullRelations } from '@/types'

export interface StudentArticle {
  id: number
  title: string
  abstract: string
  doi_link: string
  publication_date: string
  publication_place: string
}

export interface StudentProfileViewProps {
  item: StudentDetailedWithFullRelations & { articles?: StudentArticle[] }
  isOpen: boolean
  onClose: () => void
}

const ACCORDION_CLASS = 'group mb-2 rounded-md border border-border'
const ACCORDION_SUMMARY_CLASS =
  'flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 [&::-webkit-details-marker]:hidden'
const ACCORDION_ICON_CLASS =
  'h-5 w-5 shrink-0 transition-transform group-open:rotate-180'

export default function StudentProfileView(props: StudentProfileViewProps) {
  const { item, isOpen, onClose } = props

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton
        className="left-0 top-0 block h-screen max-h-screen w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto p-0 sm:rounded-none"
      >
        <DialogHeader className="sticky top-0 z-10 flex-row items-center space-y-0 bg-[#1C253F] px-4 py-2 text-white sm:text-left">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="close"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <X />
          </Button>
          <DialogTitle className="ml-2 flex-1 text-xl font-medium text-white">
            {item.name}
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            Voltar
          </Button>
        </DialogHeader>

        <div className="p-4">
          <div className="mb-4 p-6">
            <div className="pb-4">
              <h2 className="text-xl font-bold">Informações de Contato</h2>
              <Separator />
            </div>
            <p>
              <strong>Nome Completo:</strong> {item.name}
            </p>
            <p>
              <strong>E-mail:</strong> {item.email}
            </p>
            <p>
              <strong>Telefone:</strong>{' '}
              <a
                href={`https://wa.me/${(item.phone_number ?? '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.phone_number}
              </a>
            </p>
            <p>
              <strong>Link para Lattes:</strong>{' '}
              <a href={item.link_to_lattes} target="_blank" rel="noreferrer">
                {item.link_to_lattes}
              </a>
            </p>
          </div>

          <div className="mb-4 p-6">
            <div className="pb-4">
              <h2 className="text-xl font-bold">Matrículas no PGCOMP</h2>
              <Separator />
            </div>
            {item.enrollments ? (
              item.enrollments.map((enrollment) => (
                <details key={enrollment.id} className={ACCORDION_CLASS}>
                  <summary className={ACCORDION_SUMMARY_CLASS}>
                    <span>
                      {enrollment.enrollment_number} {' - '} {enrollment.enrollment_program}
                    </span>
                    <ChevronDown className={ACCORDION_ICON_CLASS} />
                  </summary>
                  <div className="px-4 pb-4">{enrollment.defense_prediction_date}</div>
                </details>
              ))
            ) : (
              <p>Nenhuma matrícula foi encontrada.</p>
            )}
          </div>

          <div className="mb-4 p-6">
            <div className="pb-4">
              <h2 className="text-xl font-bold">Artigos e Publicações</h2>
              <Separator />
            </div>
            {item.articles ? (
              item.articles.map((article) => (
                <details key={article.id} className={ACCORDION_CLASS}>
                  <summary className={ACCORDION_SUMMARY_CLASS}>
                    <span className="text-base font-bold">{article.title}</span>
                    <ChevronDown className={ACCORDION_ICON_CLASS} />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="pb-6 text-sm">{article.abstract}</p>
                    <p className="text-xs">
                      <a href={article.doi_link} target="_blank" rel="noreferrer">
                        Disponível em: <b>{article.doi_link}</b>
                      </a>
                      <br />
                      Publicado <b>{formatDate(article.publication_date)}</b> no(a){' '}
                      <b>{article.publication_place}</b>
                    </p>
                  </div>
                </details>
              ))
            ) : (
              <p>Nenhum artigo ou publicação foi encontrado.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
