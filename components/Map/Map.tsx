import React, { ReactElement, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { useDispatch, useSelector } from 'react-redux';
import { getMapState } from '../../store/map/selectors';
import { setLoc } from '../../store/map/actions';

interface Props {
  preLat: number,
  preLong: number,
}

function Map(prop: Props): ReactElement {
  // mapConfig, redux and state part
  const mapConfig = {
    center: {
      lat: 13.736717,
      lng: 100.523186
    },
    zoom: 15
  };
  const { preLat, preLong } = prop
  const loc = useSelector(getMapState)
  const dispatch = useDispatch()
  const [infoWindow, setInfoWindow] = useState<any>(null)
  const [mapObject, setMapObject] = useState<any>(null)

  //event handle part
  const handleApiLoaded = (map:any, maps:any) => {
    setMapObject(map)
    setInfoWindow(new maps.InfoWindow())
    map.addListener("click", (mapsMouseEvent:any) => {handleGgMapLoc(mapsMouseEvent)});
  };
  
  // handle if user click on map area
  const handleGgMapLoc = (mapsMouseEvent:any) => {
    // get click position
    const clickLoc = mapsMouseEvent.latLng.toJSON()
    // set to redux
    dispatch(setLoc({
      lat: Number(clickLoc.lat),
      long: Number(clickLoc.lng),
    }))
  }

  // on map loaded or preLat or preLong change
  useEffect(() => {
    const pos = {
      lat: loc.lat,
      lng: loc.long
    };
    if(mapObject !== null && infoWindow !== null){
      infoWindow.open(mapObject);
      mapObject.setCenter(pos);
    }
  }, [infoWindow, preLat, preLong])

  return (
    <div className="tw-aspect-w-4 tw-aspect-h-3 md:tw-aspect-w-16 md:tw-aspect-h-9 tw-border tw-border-gray-300 tw-rounded-lg">
      <div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_KEY? process.env.NEXT_PUBLIC_GOOGLE_KEY:'',
            language: 'th',
            region: 'th',
            libraries:['places']
          }}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <Marker 
            lat={loc.lat} 
            lng={loc.long} 
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map
