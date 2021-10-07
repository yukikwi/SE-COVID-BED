import React, { ReactElement, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props): ReactElement {
  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -200, y: 0 },
  }
  return (
    <div className="tw-w-screen tw-overflow-x-hidden">
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
        className="tw-min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  )
}

export default Layout
