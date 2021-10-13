import React, { ReactChild, ReactElement } from 'react'
import HospitalNavbar from '../Navbar'

interface Props {
  children: ReactChild,
  button: ReactElement,
  title: string
}

LayoutHospital.defaultProps = {
  button: <></>
}

function LayoutHospital(props: Props): ReactElement {
  const {children, title, button} = props
  return (
    <div>
      <HospitalNavbar />
      <div className="md:tw-mx-10 tw-mx-2 tw-my-5 tw-grid tw-grid-cols-2">
        <div className="tw-col-span-2 md:tw-col-span-1">
          <h1 className="tw-text-charcoal tw-text-3xl tw-font-bold">{ title }</h1>
        </div>
        <div className="tw-col-span-2 md:tw-col-span-1 tw-mt-5 md:tw-mt-0">
          { button }
        </div>

        <div className="tw-bg-white tw-p-5 tw-mt-5 tw-col-span-2 tw-rounded-lg">
          { children }
        </div>
      </div>
    </div>
  )
}

export default LayoutHospital