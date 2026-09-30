// Real-Time Visitor IP & Geo-Coordinates Telemetry Engine — ZERO FAKE DATA

export const getMobileGPSLocation = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
      resolve(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (pos && pos.coords) {
          resolve({
            latitude: Number(pos.coords.latitude).toFixed(4),
            longitude: Number(pos.coords.longitude).toFixed(4),
            accuracy: pos.coords.accuracy
          })
        } else {
          resolve(null)
        }
      },
      () => resolve(null),
      { timeout: 6000, enableHighAccuracy: true, maximumAge: 0 }
    )
  })
}

export const getRealVisitorGeo = async () => {
  // Request HTML5 GPS concurrently while API runs
  const gpsPromise = getMobileGPSLocation()

  // Tier 1: freeipapi.com — no rate limit, CORS-safe, returns full geo
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)
    const res = await fetch('https://freeipapi.com/api/json', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (res.ok) {
      const data = await res.json()
      if (data && data.ipAddress) {
        const gps = await gpsPromise
        return {
          ip: data.ipAddress,
          city: data.cityName || '—',
          region: data.regionName || '—',
          country: data.countryName || '—',
          countryCode: data.countryCode || '',
          flag: getFlagEmoji(data.countryCode),
          latitude: gps?.latitude || (data.latitude ? Number(data.latitude).toFixed(4) : null),
          longitude: gps?.longitude || (data.longitude ? Number(data.longitude).toFixed(4) : null),
          isp: data.isp || data.asName || '—',
          timezone: data.timeZone || '—',
        }
      }
    }
  } catch (_) {}

  // Tier 2: ipwho.is
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)
    const res = await fetch('https://ipwho.is/', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (res.ok) {
      const data = await res.json()
      if (data && data.success !== false && data.ip) {
        const gps = await gpsPromise
        return {
          ip: data.ip,
          city: data.city || '—',
          region: data.region || '—',
          country: data.country || '—',
          countryCode: data.country_code || '',
          flag: data.flag?.emoji || getFlagEmoji(data.country_code),
          latitude: gps?.latitude || (data.latitude ? Number(data.latitude).toFixed(4) : null),
          longitude: gps?.longitude || (data.longitude ? Number(data.longitude).toFixed(4) : null),
          isp: data.connection?.isp || data.connection?.org || '—',
          timezone: data.timezone?.id || '—',
        }
      }
    }
  } catch (_) {}

  // Tier 3: ipapi.co
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500)
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (res.ok) {
      const data = await res.json()
      if (data && data.ip && !data.error) {
        const gps = await gpsPromise
        return {
          ip: data.ip,
          city: data.city || '—',
          region: data.region || '—',
          country: data.country_name || '—',
          countryCode: data.country_code || '',
          flag: getFlagEmoji(data.country_code),
          latitude: gps?.latitude || (data.latitude ? Number(data.latitude).toFixed(4) : null),
          longitude: gps?.longitude || (data.longitude ? Number(data.longitude).toFixed(4) : null),
          isp: data.org || data.asn || '—',
          timezone: data.timezone || '—',
        }
      }
    }
  } catch (_) {}

  // Tier 4: ipify — IP only, then reverse geo via freeipapi
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (res.ok) {
      const data = await res.json()
      if (data && data.ip) {
        const gps = await gpsPromise
        // Try to reverse geo the IP
        try {
          const r2 = await fetch(`https://freeipapi.com/api/json/${data.ip}`)
          if (r2.ok) {
            const d2 = await r2.json()
            if (d2 && d2.ipAddress) {
              return {
                ip: d2.ipAddress,
                city: d2.cityName || '—',
                region: d2.regionName || '—',
                country: d2.countryName || '—',
                countryCode: d2.countryCode || '',
                flag: getFlagEmoji(d2.countryCode),
                latitude: gps?.latitude || (d2.latitude ? Number(d2.latitude).toFixed(4) : null),
                longitude: gps?.longitude || (d2.longitude ? Number(d2.longitude).toFixed(4) : null),
                isp: d2.isp || '—',
                timezone: d2.timeZone || '—',
              }
            }
          }
        } catch (_) {}

        return {
          ip: data.ip,
          city: '—',
          region: '—',
          country: '—',
          countryCode: '',
          flag: '🌐',
          latitude: gps?.latitude || null,
          longitude: gps?.longitude || null,
          isp: '—',
          timezone: '—',
        }
      }
    }
  } catch (_) {}

  // Final fallback — no fake data, all nulls
  const gps = await gpsPromise
  return {
    ip: 'Detecting...',
    city: '—',
    region: '—',
    country: '—',
    countryCode: '',
    flag: '🌐',
    latitude: gps?.latitude || null,
    longitude: gps?.longitude || null,
    isp: '—',
    timezone: '—',
  }
}

// Browser & Device Telemetry Detector
export const detectBrowserAndDevice = () => {
  if (typeof window === 'undefined' || !navigator) {
    return { device: 'Desktop Workstation', browser: 'Browser Engine' }
  }

  const ua = navigator.userAgent
  let device = 'Desktop PC'
  if (/iphone/i.test(ua)) device = 'iPhone Mobile (iOS)'
  else if (/ipad/i.test(ua)) device = 'iPad Tablet (iOS)'
  else if (/android/i.test(ua)) device = 'Android Smartphone'
  else if (/macintosh|mac os x/i.test(ua)) device = 'Apple Mac'
  else if (/linux/i.test(ua)) device = 'Linux Workstation'
  else if (/windows/i.test(ua)) device = 'Windows PC'

  let browser = 'Chrome'
  if (/edg/i.test(ua)) browser = 'Microsoft Edge'
  else if (/firefox/i.test(ua)) browser = 'Mozilla Firefox'
  else if (/crios/i.test(ua)) browser = 'Chrome iOS'
  else if (/fxios/i.test(ua)) browser = 'Firefox iOS'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Mobile Safari'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'

  return { device, browser }
}

export function getFlagEmoji(countryCode) {
  if (!countryCode) return '🌐'
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch (_) {
    return '🌐'
  }
}

// Safe Coordinate Formatter — never returns fake Karachi defaults
export const formatCoordinates = (lat, lng) => {
  const isValid = (v) => v !== null && v !== undefined && v !== '' && v !== 'undefined' && v !== 'null' && !isNaN(Number(v))
  if (isValid(lat) && isValid(lng)) {
    return `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`
  }
  return 'Locating...'
}

// Log real visitor session into localStorage with section tracking
export const logRealTimeVisitor = (geo, activeSection = '#home', durationSeconds = 0) => {
  if (typeof window === 'undefined') return
  try {
    const { device, browser } = detectBrowserAndDevice()

    // Clean stale fake visitors that may be cached
    const FAKE_IPS = ['86.134.20.11', '35.212.89.104', '103.255.4.19', '115.186.160.4', '182.185.142.92']
    const existing = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')
    const cleaned = existing.filter(item => item && !FAKE_IPS.includes(item.ip))

    const currentVisitor = {
      id: 'VIS-' + Math.floor(1000 + Math.random() * 9000),
      ip: geo?.ip || 'Detecting...',
      country: geo?.country ? `${geo.country} ${geo?.flag || ''}`.trim() : '—',
      city: geo?.city || '—',
      latitude: geo?.latitude ? String(geo.latitude) : null,
      longitude: geo?.longitude ? String(geo.longitude) : null,
      isp: geo?.isp || '—',
      duration: durationSeconds > 0 ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : 'Active Now',
      activeSection: activeSection,
      device: device,
      browser: browser,
      entrance: 'Direct Visit',
      lastActive: 'Just now',
      status: 'Active Online',
      radarX: Math.floor(20 + Math.random() * 60),
      radarY: Math.floor(20 + Math.random() * 60),
      timestamp: new Date().toISOString()
    }

    // Deduplicate by IP
    const sanitized = cleaned.filter(item => item.ip !== currentVisitor.ip)
    const updated = [currentVisitor, ...sanitized].slice(0, 20)
    localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(updated))

    // Broadcast to Admin Panel tab
    if ('BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel('NEXORA_TELEMETRY_CHANNEL')
        bc.postMessage({ type: 'VISITOR_LOGGED', visitor: currentVisitor })
        bc.close()
      } catch (_) {}
    }

    return updated
  } catch (err) {
    console.error('Visitor log error:', err)
  }
}

// Update only the activeSection and duration of the current visitor in localStorage
export const updateVisitorSection = (ip, activeSection, durationSeconds) => {
  if (typeof window === 'undefined' || !ip || ip === 'Detecting...') return
  try {
    const existing = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')
    const updated = existing.map(v => {
      if (v.ip === ip) {
        return {
          ...v,
          activeSection,
          duration: durationSeconds > 0 ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : 'Active Now',
          lastActive: 'Just now'
        }
      }
      return v
    })
    localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(updated))

    if ('BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel('NEXORA_TELEMETRY_CHANNEL')
        bc.postMessage({ type: 'VISITOR_SECTION_UPDATE', ip, activeSection, durationSeconds })
        bc.close()
      } catch (_) {}
    }
  } catch (_) {}
}
