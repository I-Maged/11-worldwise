import Button from './Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useCities } from '../contexts/usecities'
import { useGeolocation } from '../hooks/useGeolocation'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'

import styles from './Map.module.css'

const Map = () => {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([40, -3])
  const [searchParams] = useSearchParams()
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()

  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')

  useEffect(() => {
    function changePosition() {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }
    changePosition()
  }, [mapLat, mapLng])

  useEffect(() => {
    function changePosition() {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
    changePosition()
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {/* <div className={styles.mapContainer} onClick={() => navigate('form')}> */}

      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'get your location'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {geolocationPosition && (
          <Marker
            position={[geolocationPosition.lat, geolocationPosition.lat]}
            key={geolocationPosition.lat}
          ></Marker>
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}

export default Map
