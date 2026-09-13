import { Copy, MessageCircle, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatPhone } from '@/helpers/formatters'
import type { ScholarshipDetailedWithRelations } from '@/types'

export interface DialogContatoBolsistaProps {
  item: ScholarshipDetailedWithRelations
  isOpen: boolean
  onClose: () => void
}

function DialogContatoBolsista({ item, isOpen, onClose }: DialogContatoBolsistaProps) {
  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    toast.success('Conteúdo copiado com sucesso!', { autoClose: 1000 })
  }

  const openWhatsApp = (phone: string) => {
    const adjutedPhone = phone.replace(/[^0-9]/g, '')
    const url = `https://api.whatsapp.com/send?phone=55${adjutedPhone}`
    window.open(url, '_blank')
  }

  const openLattes = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="font-inter sm:max-w-[595px]">
        <DialogHeader>
          <DialogTitle>Contatos de {item.student?.name.split(' ')[0]}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-6 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Input
                id="email"
                type="text"
                name="email"
                value={item.student?.email ?? ''}
                readOnly
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Copiar e-mail"
                onClick={() => copyEmailToClipboard(item.student?.email ?? '')}
                className="absolute right-0 top-0 h-9 w-9"
              >
                <Copy />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Input
                id="phone"
                type="text"
                name="phone"
                value={formatPhone(item.student?.phone_number) ?? ''}
                readOnly
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Abrir conversa no WhatsApp"
                onClick={() => openWhatsApp(item.student?.phone_number ?? '')}
                className="absolute right-0 top-0 h-9 w-9"
              >
                <MessageCircle />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lattes">Lattes</Label>
            <div className="relative">
              <Input
                id="lattes"
                type="text"
                name="lattes"
                value={item.student?.link_to_lattes ?? ''}
                readOnly
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Abrir o currículo Lattes"
                onClick={() => openLattes(item.student?.link_to_lattes ?? '')}
                className="absolute right-0 top-0 h-9 w-9"
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { DialogContatoBolsista }
