import { initGoogleMaps } from './googleMapsLoader'

export type LocationData = {
  address: string
  lat: number
  lng: number
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

// Get autocomplete suggestions
export const getAddressPredictions = async (input: string) => {
  await initGoogleMaps()

  return new Promise<google.maps.places.AutocompletePrediction[]>(
    (resolve) => {
      const service = new google.maps.places.AutocompleteService()
      service.getPlacePredictions({ input }, (predictions) => {
        resolve(predictions || [])
      })
    }
  )
}

// Get full location details from placeId
export const getLocationFromPlaceId = async (
  placeId: string
): Promise<LocationData | null> => {
  await initGoogleMaps()

  return new Promise((resolve) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== 'OK' || !results?.[0]) {
        resolve(null)
        return
      }

      const result = results[0]
      const components = result.address_components

      const getComponent = (type: string) =>
        components.find((c) => c.types.includes(type))?.long_name

      resolve({
        address: result.formatted_address,
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
        city: getComponent('locality'),
        state: getComponent('administrative_area_level_1'),
        country: getComponent('country'),
        postalCode: getComponent('postal_code'),
      })
    })
  })
}

export const getLocationFromCoords = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  if (!data.results || !data.results[0]) return null

  const components = data.results[0].address_components
  const getComponent = (type: string) =>
    components.find((c: any) => c.types.includes(type))?.long_name

  return {
    address: data.results[0].formatted_address,
    lat,
    lng,
    city: getComponent('locality'),
    state: getComponent('administrative_area_level_1'),
    country: getComponent('country'),
    postalCode: getComponent('postal_code'),
  }
}
