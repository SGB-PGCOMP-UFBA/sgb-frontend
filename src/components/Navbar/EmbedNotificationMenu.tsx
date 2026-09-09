import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Notifications from '@mui/icons-material/Notifications'
import {
  Badge,
  Box,
  IconButton,
  Menu,
  Typography
} from '@mui/material'
import { api } from '../../api'
import { formatDateHour } from '../../helpers/formatters'
import CancelIcon from '@mui/icons-material/Cancel'
import { formatApiError } from '../../helpers/api-error'
import type { StoredUser } from '../../helpers/auth-user'
import type {
  EmbedNotificationDetailed,
  NotificationOwnerType
} from '../../types'

export interface EmbedNotificationMenuProps {
  /** `null` quando nao ha sessao ativa. */
  user: StoredUser | null
}

export default function EmbedNotificationMenu(
  props: EmbedNotificationMenuProps
) {
  const { user } = props
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [embedNotifications, setEmbedNotifications] = useState<
    EmbedNotificationDetailed[]
  >([])
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    getEmbedNotifications().finally(() => setIsLoading(false))
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getEmbedNotifications = async () => {
    if (!user) {
      return
    }

    const role: NotificationOwnerType =
      user.role === 'ADVISOR_WITH_ADMIN_PRIVILEGES' ? 'ADVISOR' : user.role
    const response = await api.embedNotification.getAllEmbedNotifications(
      user.id,
      role
    )

    if (response.status === 200) {
      setEmbedNotifications(response.data)
    } else {
      toast.error(formatApiError(response.status, response.data))
    }
  }

  const consumeEmbedNotification = async (
    embed_notification: EmbedNotificationDetailed
  ) => {
    const response = await api.embedNotification.consumeEmbedNotification(
      embed_notification.id
    )

    if (response.status >= 400) {
      toast.error(formatApiError(response.status, response.data))
    } else {
      getEmbedNotifications()
    }
  }

  useEffect(() => {
    getEmbedNotifications().finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {!isLoading && (
        <>
          <IconButton
            size="medium"
            style={{
              backgroundColor: 'transparent',
              color: '#1c253f',
              height: '48px',
              width: '48px'
            }}
            onClick={handleMenu}
          >
            <Badge badgeContent={embedNotifications.length} color="info" max={99}>
              <Notifications color="inherit" />
            </Badge>
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'hidden',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.28))',
                mt: 1.5,
                width: 400,
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
            <Box className="py-3 px-6">
              {embedNotifications.length === 0 ? (
                <Typography variant="subtitle2" align="center">Parece que você não tem novas mensagens!</Typography>
              ) : (
                embedNotifications.map((notification) => (
                  <Box key={notification.id} className="relative p-2 mb-3" bgcolor='#e5e7eb' borderRadius={2}>
                    <IconButton color="error" className="!absolute !p-0 !top-1 !right-1" onClick={() => consumeEmbedNotification(notification)}>
                      <CancelIcon />
                    </IconButton>
                    <div className="flex flex-col">
                      <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>{notification.title}</Typography>
                      <Typography variant="subtitle2">{notification.description}</Typography>
                      <Typography variant="caption" align="right">{formatDateHour(notification.created_at)}</Typography>
                    </div>
                  </Box>
                ))
              )}
            </Box>
          </Menu>
        </>
      )}
    </div>
  )
}
