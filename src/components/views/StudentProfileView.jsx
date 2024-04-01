import * as React from 'react'
import { AppBar, Button, Dialog, Divider, IconButton, Toolbar, Typography } from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import CloseIcon from '@mui/icons-material/Close'
import { SlideUp } from '../Transitions/SlideUp'

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
      <List>
        <ListItemButton>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItemButton>
      </List>
    </Dialog>
  )
}
