import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, Stack, Skeleton } from '@mui/material'

function CardSkeletonOnLoad(props) {
  return (
    <Card sx={props.sx}>
      <CardContent className="flex flex-col w-full h-full justify-between">
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack sx={{ width: '100%' }} marginBottom={3}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Stack>
          <Skeleton variant="circular" sx={{ fontSize: '1rem' }}>
            <Avatar
              sx={{
                height: 56,
                width: 56
              }}
            />
          </Skeleton>
        </Stack>
        <Stack alignItems="center" direction="row" sx={{ mt: 2, width: '100%' }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
        </Stack>
      </CardContent>
    </Card>
  )
}

CardSkeletonOnLoad.propTypes = {
  sx: PropTypes.node
}

export { CardSkeletonOnLoad }
