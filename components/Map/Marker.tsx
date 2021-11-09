import React, { ReactElement } from 'react'

// Fix warning only
interface Props {
  lat: any, 
  lng: any
}

function Marker({}: Props): ReactElement {
  return (
    <div style={{
      position: 'relative', color: 'white', background: 'red',
      height: 40, width: 60, top: -40, left: -30,
    }}>
      Selected Location
    </div>
  )
}

export default Marker
