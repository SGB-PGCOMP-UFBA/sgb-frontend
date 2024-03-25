import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Person, Logout, Settings, Notifications } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Typography,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material'
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/auth-user'

export default function MenuAppBar() {
  const navigate = useNavigate()
  const user = getUserFromLocalStorage()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    removeUserFromLocalStorage()
    navigate('/', { replace: true })
  }

  const stringAvatar = (name) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')

    return {
      children: initials
    }
  }

  return (
    <Box
      className="hidden text-center text-sm font-semibold md:block"
      sx={{ height: 50, marginBottom: 2 }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'transparent', borderBottom: 1, borderColor: '#d1d3d8' }}
      >
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <div>
            <IconButton
              size="medium"
              aria-label="show 17 new notifications"
              style={{
                backgroundColor: 'transparent',
                color: '#1c253f',
                height: '48px',
                width: '48px'
              }}
            >
              <Badge badgeContent={17} color="error">
                <Notifications color="white" />
              </Badge>
            </IconButton>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <Avatar
                {...stringAvatar(user ? user.name : '')}
                style={{
                  backgroundColor: '#1c253f',
                  width: '48px',
                  height: '48px'
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.28))',
                  mt: 1.5,
                  width: 200,
                  '& .MuiAvatar-root': {
                    width: 28,
                    height: 28,
                    ml: -0.5,
                    mr: 1
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box className="py-4 px-5">
                <Typography variant="subtitle1">{user ? user.name : ''}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user ? user.email : ''}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Configurações
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}