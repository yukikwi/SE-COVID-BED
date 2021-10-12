import React, { ReactChild, ReactElement } from 'react'
import HospitalNavbar from '../Navbar'

interface Props {
  children: ReactChild,
  button: ReactElement,
  title: string
}

LayoutSystem.defaultProps = {
  button: <></>
}

function LayoutSystem(props: Props): ReactElement {
  const {children, title, button} = props
  return (
    <div>
      <HospitalNavbar system/>
      <div className="tw-mx-10 tw-my-5 tw-grid tw-grid-cols-2">
        <div>
          <h1 className="tw-text-charcoal tw-text-3xl tw-font-bold">{ title }</h1>
        </div>
        <div>
          { button }
        </div>

        <div className="tw-bg-white tw-p-5 tw-mt-5 tw-col-span-2 tw-rounded-lg">
          { children }
        </div>
      </div>
    </div>
  )
}

export default LayoutSystem
