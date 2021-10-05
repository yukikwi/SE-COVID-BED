import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

interface Props {
    target: string
    text: string
}

function PositiveButton(props: Props): ReactElement {
  const {target, text} = props
  const router = useRouter()
  const goToTarget = () => {
    router.push(target)
  }

  return (
    <button onClick={goToTarget} className="tw-rounded-full tw-bg-dark-green tw-p-5 tw-text-white tw-w-1/4 tw-text-2xl">
      {text}
    </button>
  )
}

export default PositiveButton
