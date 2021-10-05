import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

interface Props {
  className: string,
  target: string
  text: string
}

function PositiveButton(props: Props): ReactElement {
  const {target, text, className} = props
  const router = useRouter()
  const goToTarget = () => {
    router.push(target)
  }
  const componentClassName = `${className} tw-rounded-full tw-bg-dark-green tw-p-5 tw-text-white tw-w-3/5 md:tw-w-2/5 tw-text-2xl`

  return (
    <button onClick={goToTarget} className={componentClassName}>
      {text}
    </button>
  )
}

export default PositiveButton
