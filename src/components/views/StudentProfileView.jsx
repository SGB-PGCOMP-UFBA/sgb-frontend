import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function StudentProfileView(props) {
  const { item, isOpen, onClose } = props

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
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
