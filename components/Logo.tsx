import React, { ReactElement } from 'react'

interface Props {
  
}

function Logo({}: Props): ReactElement {
  return (
    <div className="tw-mb-5">
      <div className="tw-relative tw-h-14 md:tw-h-24 tw-text-center">
        <h1 className="tw-absolute tw-font-bold md:tw-text-8xl tw-text-5xl tw-text-dark-matcha-green tw-w-full tw-z-10">COVID-19</h1>
        <h1 className="tw-absolute tw-font-bold md:tw-text-8xl tw-text-5xl tw-text-dark-green tw-top-0.5 tw-left-0.5 tw-w-full tw-z-0">COVID-19</h1>
      </div>
      <div className="tw-relative tw-h-14 tw-text-center">
        <h3 className="tw-absolute tw-font-bold tw-text-2xl md:tw-text-3xl tw-text-dark-matcha-green tw-w-full tw-z-10">Manage hospital resouce</h3>
        <h3 className="tw-absolute tw-font-bold tw-text-2xl md:tw-text-3xl tw-text-dark-green tw-top-0.5 tw-left-0.5 tw-w-full tw-z-0">Manage hospital resouce</h3>
      </div>
    </div>
  )
}

export default Logo
