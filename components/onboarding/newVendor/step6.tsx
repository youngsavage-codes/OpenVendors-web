'use client'

import React, { useState } from 'react'
import { getAddressPredictions, getLocationFromPlaceId, getLocationFromCoords, LocationData } from '@/lib/googleLocation'
import { MapPin } from 'lucide-react'
import CustomInput from '@/components/shared/input'

const Step6: React.FC = () => {
  const [address, setAddress] = useState('')
  const [predictions, setPredictions] = useState<any[]>([])
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = async (value: string) => {
    setAddress(value)
    setLocation(null)

    if (!value) {
      setPredictions([])
      return
    }

    const results = await getAddressPredictions(value)
    setPredictions(results)
  }

  const handleSelect = async (prediction: any) => {
    setLoading(true)
    setAddress(prediction.description)
    setPredictions([])

    const data = await getLocationFromPlaceId(prediction.place_id)
    setLocation(data)
    setLoading(false)
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const data = await getLocationFromCoords(latitude, longitude)
        setLocation(data)
        setAddress(data?.address)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        alert('Unable to get your location')
        setLoading(false)
      }
    )
  }

  return (
    <div className="space-y-4 relative">
      <div className="relative flex items-center">
        <CustomInput
          label="Where's your business located?"
          placeholder="Enter business address"
          value={address}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="w-full"
        />
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="absolute right-3 top-[38px] bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <MapPin size={20} />
        </button>
      </div>

      {predictions.length > 0 && (
        <div className="absolute z-10 bg-white border w-full shadow-sm max-h-60 overflow-auto">
          {predictions.map((item) => (
            <div
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {item.description}
            </div>
          ))}
        </div>
      )}

      <button
        disabled={loading || !address}
        className="h-12 px-6 bg-black text-white rounded-sm mt-2"
      >
        {loading ? 'Finding location...' : 'Confirm location'}
      </button>

      {location && (
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p><b>City:</b> {location.city}</p>
          <p><b>State:</b> {location.state}</p>
          <p><b>Country:</b> {location.country}</p>
        </div>
      )}
    </div>
  )
}

export default Step6
