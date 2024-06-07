import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'
import { getUserFromLocalStorage } from '../../helpers/auth-user'
import EmbedNotificationMenu from './EmbedNotificationMenu'
import UserMenu from './UserMenu'

export default function MenuAppBar() {
  const user = getUserFromLocalStorage()

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
          <EmbedNotificationMenu user={user} />
          <UserMenu user={user} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
