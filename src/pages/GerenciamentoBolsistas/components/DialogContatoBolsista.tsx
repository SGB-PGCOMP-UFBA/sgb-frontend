import { Dialog, DialogTitle, DialogContent, IconButton, TextField, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import { SlideUp } from '../../../components/Transitions/SlideUp'
import { formatPhone } from '../../../helpers/formatters'
import type { ScholarshipDetailedWithRelations } from '../../../types'

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

  const dialogContent = (
    <div className="flex flex-col min-w-[395px] max-w-[595px">
      <div className="mt-2 flex flex-row font-inter">
        <TextField
          id="email"
          label="E-mail"
          type="text"
          name="email"
          fullWidth
          value={item.student?.email}
          InputProps={{
            /* `readonly` minusculo nao e prop do TextField e nao chega ao input. */
            readOnly: true,
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => copyEmailToClipboard(item.student?.email ?? '')}
                edge="end"
              >
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
      </div>
      <div className="mt-6 flex flex-row font-inter">
        <TextField
          id="phone"
          label="Telefone"
          type="text"
          name="phone"
          fullWidth
          value={formatPhone(item.student?.phone_number)}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => openWhatsApp(item.student?.phone_number ?? '')}
                edge="end"
              >
                <WhatsAppIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
      </div>
      <div className="mt-6 flex flex-row font-inter">
        <TextField
          id="lattes"
          label="Lattes"
          type="text"
          name="lattes"
          fullWidth
          value={item.student?.link_to_lattes}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => openLattes(item.student?.link_to_lattes ?? '')}
                edge="end"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onClose={onClose} TransitionComponent={SlideUp}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Contatos de {item.student?.name.split(' ')[0]}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  )
}

export { DialogContatoBolsista }
