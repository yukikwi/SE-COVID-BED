import React, { ReactElement } from 'react'

// Fix warning only
interface Props {
  lat: any, 
  lng: any
}

function Marker({}: Props): ReactElement {
  return (
    <div style={{
      position: 'relative', color: '#D73534',
      height: 40, width: 60, top: -40, left: -30,
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-10 tw-w-10 tw-mx-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default Marker
