const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!

let isLoaded = false
let loadPromise: Promise<void>

export const initGoogleMaps = (): Promise<void> => {
  if (isLoaded) return Promise.resolve()

  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('google-maps-js')

    if (existing) {
      existing.addEventListener('load', () => {
        isLoaded = true
        resolve()
      })
      return
    }

    const script = document.createElement('script')
    script.id = 'google-maps-js'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      isLoaded = true
      resolve()
    }

    script.onerror = () => reject(new Error('Google Maps failed to load'))

    document.head.appendChild(script)
  })

  return loadPromise
}
