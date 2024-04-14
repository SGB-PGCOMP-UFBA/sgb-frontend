import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import { SlideUp } from '../../../components/Transitions/SlideUp'

function DialogContatoBolsista({ item, isOpen, onClose }) {

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email)
    toast.success('Conteúdo copiado com sucesso!', { autoClose: 1000 })
  }

  const openWhatsApp = (phone) => {
    const adjutedPhone = phone.replace(/[^0-9]/g, '')
    const url = `https://api.whatsapp.com/send?phone=55${adjutedPhone}`
    window.open(url, '_blank')
  }

  const openLattes = (link) => {
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
          readonly
          fullWidth
          value={item.student.email}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => copyEmailToClipboard(item.student.email)}
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
          readonly
          fullWidth
          value={item.student.phone_number}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => openWhatsApp(item.student.phone_number)}
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
          readonly
          fullWidth
          value={item.student.link_to_lattes}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                onClick={() => openLattes(item.student.link_to_lattes)}
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
      <DialogTitle>Contatos de {item.student.name.split(' ')[0]}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  )
}

export { DialogContatoBolsista }
