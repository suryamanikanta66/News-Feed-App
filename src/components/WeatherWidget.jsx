// src/components/WeatherWidget.jsx
import React, { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Droplets, Search, MapPin, RefreshCw } from 'lucide-react'

export default function WeatherWidget() {
  const [city, setCity] = useState(() => {
    try {
      return localStorage.getItem('weather_city') || 'Hyderabad'
    } catch {
      return 'Hyderabad'
    }
  })
  const [searchCity, setSearchCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  // Map WMO codes to Icons and Labels
  const getWeatherDetails = (code) => {
    if (code === 0) return { icon: <Sun className="w-10 h-10 text-amber-500 animate-spin-slow" />, label: 'Sunny' }
    if (code === 1 || code === 2 || code === 3) {
      return { icon: <Cloud className="w-10 h-10 text-sky-400" />, label: 'Partly Cloudy' }
    }
    if (code === 45 || code === 48) {
      return { icon: <CloudFog className="w-10 h-10 text-slate-400" />, label: 'Foggy' }
    }
    if (code === 51 || code === 53 || code === 55 || code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
      return { icon: <CloudRain className="w-10 h-10 text-indigo-400" />, label: 'Rainy' }
    }
    if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
      return { icon: <CloudSnow className="w-10 h-10 text-blue-300" />, label: 'Snowy' }
    }
    if (code === 95 || code === 96 || code === 99) {
      return { icon: <CloudLightning className="w-10 h-10 text-amber-600" />, label: 'Thunderstorm' }
    }
    return { icon: <Sun className="w-10 h-10 text-amber-500" />, label: 'Clear' }
  }

  const fetchWeatherByCoords = async (lat, lon, cityName, countryName) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      )
      if (!res.ok) throw new Error('Failed to retrieve weather data')
      const data = await res.json()
      
      setWeatherData({
        city: cityName,
        country: countryName || '',
        temp: Math.round(data.current_weather.temperature),
        wind: Math.round(data.current_weather.windspeed),
        code: data.current_weather.weathercode,
        forecast: data.daily.time.slice(1, 4).map((time, idx) => ({
          day: new Date(time).toLocaleDateString(undefined, { weekday: 'short' }),
          maxTemp: Math.round(data.daily.temperature_2m_max[idx + 1]),
          minTemp: Math.round(data.daily.temperature_2m_min[idx + 1]),
          code: data.daily.weathercode[idx + 1]
        }))
      })
      try {
        localStorage.setItem('weather_city', cityName)
      } catch (e) {
        console.warn("Storage write blocked:", e)
      }
      window.dispatchEvent(new CustomEvent('weather_city_changed', { detail: cityName }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchCity = async (e) => {
    e.preventDefault()
    if (!searchCity.trim()) return

    try {
      setIsSearching(true)
      setError(null)
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1`)
      if (!res.ok) throw new Error('City lookup failed')
      const data = await res.json()

      if (!data.results || data.results.length === 0) {
        throw new Error('City not found. Try another city name.')
      }

      const { latitude, longitude, name, country } = data.results[0]
      setCity(name)
      await fetchWeatherByCoords(latitude, longitude, name, country)
      setSearchCity('')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSearching(false)
    }
  }

  // Geocode default city
  const loadDefault = async () => {
    try {
      setLoading(true)
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      if (!res.ok) throw new Error('Geocoding failed')
      const data = await res.json()
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0]
        fetchWeatherByCoords(latitude, longitude, name, country)
      } else {
        // Hardcoded fallback for Hyderabad if geocoding fails
        fetchWeatherByCoords(17.3850, 78.4867, 'Hyderabad', 'India')
      }
    } catch (err) {
      // Fallback
      fetchWeatherByCoords(17.3850, 78.4867, 'Hyderabad', 'India')
    }
  }

  // Detect current location using HTML5 Geolocation API and reverse-geocode with Nominatim (OSM)
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    
    setLoading(true)
    setError(null)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          let detectedName = 'Local Weather'
          let detectedCountry = ''
          try {
            // Call OpenStreetMap Nominatim reverse geocoder
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              { headers: { 'Accept-Language': 'en' } }
            )
            if (geoRes.ok) {
              const geoData = await geoRes.json()
              const addr = geoData.address || {}
              detectedName = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Local Area'
              detectedCountry = addr.country || ''
            }
          } catch (e) {
            detectedName = 'Current Location'
          }
          
          setCity(detectedName)
          await fetchWeatherByCoords(latitude, longitude, detectedName, detectedCountry)
        } catch (err) {
          setError('Failed to fetch weather for your location')
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        console.warn("Geolocation permission denied/failed. Falling back to default city:", err.message)
        loadDefault()
      },
      { timeout: 8000 }
    )
  }

  // Initial load
  useEffect(() => {
    let savedCity = null
    try {
      savedCity = localStorage.getItem('weather_city')
    } catch (e) {
      console.warn("Storage read blocked:", e)
    }
    if (!savedCity) {
      handleDetectLocation()
    } else {
      loadDefault()
    }
  }, [])

  return (
    <div className="w-full rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header and Search Form */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500 animate-bounce" />
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">Weather Report</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Live atmospheric stats</p>
          </div>
        </div>

        {/* Search and GPS controls */}
        <div className="flex items-center gap-2 max-w-xs w-full justify-end">
          <button
            type="button"
            onClick={handleDetectLocation}
            className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-500 border border-slate-200/40 dark:border-slate-800/40 transition-colors shrink-0 flex items-center justify-center"
            title="Detect My Location"
            disabled={loading}
          >
            <MapPin className={`w-3.5 h-3.5 ${loading ? 'animate-bounce' : ''}`} />
          </button>

          <form onSubmit={handleSearchCity} className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 rounded-xl text-xs focus:outline-none glass-input text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50"
              disabled={isSearching}
            />
            <button
              type="submit"
              className="absolute right-2 text-slate-400 hover:text-indigo-500 transition-colors p-1"
              title="Search"
              disabled={isSearching}
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </div>

      {/* Weather Content Block */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-xs text-slate-400">Fetching forecast...</span>
        </div>
      ) : error ? (
        <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs text-center">
          {error}
        </div>
      ) : weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Current weather: 5 cols */}
          <div className="md:col-span-5 flex items-center gap-4 border-r border-slate-200/40 dark:border-slate-800/40 pr-0 md:pr-6">
            <div className="p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/20 dark:border-slate-800/20 flex items-center justify-center shrink-0">
              {getWeatherDetails(weatherData.code).icon}
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 dark:text-white leading-none">
                  {weatherData.temp}°C
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {getWeatherDetails(weatherData.code).label}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1 flex items-center gap-1">
                {weatherData.city}
                {weatherData.country && (
                  <span className="text-xs font-medium text-slate-400">, {weatherData.country}</span>
                )}
              </p>
            </div>
          </div>

          {/* Current stats: 3 cols */}
          <div className="md:col-span-3 flex flex-row md:flex-col justify-around gap-3 border-r border-slate-200/40 dark:border-slate-800/40 pr-0 md:pr-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Wind className="w-4.5 h-4.5 text-sky-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">WIND SPEED</p>
                <p className="text-slate-700 dark:text-slate-200">{weatherData.wind} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4.5 h-4.5 text-indigo-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">HUMIDITY</p>
                <p className="text-slate-700 dark:text-slate-200">Moderate</p>
              </div>
            </div>
          </div>

          {/* 3-Day Forecast: 4 cols */}
          <div className="md:col-span-4 flex justify-between gap-2">
            {weatherData.forecast.map((f, i) => (
              <div 
                key={i} 
                className="flex-1 flex flex-col items-center p-2 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/10 dark:border-slate-800/20 text-center"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase">{f.day}</span>
                <div className="my-1.5 flex justify-center scale-75">
                  {getWeatherDetails(f.code).icon}
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{f.maxTemp}°</span>
                  <span className="text-[10px] text-slate-400">{f.minTemp}°</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : null}

    </div>
  )
}
