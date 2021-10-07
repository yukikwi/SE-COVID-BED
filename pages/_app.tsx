import 'antd/dist/antd.css'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  const animateExit = () => {
    window.scrollTo(0, 0)
  }
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={animateExit}
    >
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
export default MyApp
