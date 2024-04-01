import React from 'react'
import Slide from '@mui/material/Slide'

const SlideUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export { SlideUp }
