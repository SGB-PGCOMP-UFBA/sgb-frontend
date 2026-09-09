import { forwardRef } from 'react'
import Slide from '@mui/material/Slide'
import type { SlideProps } from '@mui/material/Slide'

/** Transicao padrao dos Dialogs: entra deslizando de baixo para cima. */
const SlideUp = forwardRef<HTMLDivElement, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export { SlideUp }
