// Real-Time Visitor IP & Geo-Coordinates Telemetry Engine — ZERO FAKE DATA
// ALL APIs must be HTTPS to avoid mixed-content blocking on HTTPS sites

export const getMobileGPSLocation = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      resolve(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (pos?.coords) {
          resolve({
            latitude: Number(pos.coords.latitude).toFixed(4),
            longitude: Number(pos.coords.longitude).toFixed(4),
            accuracy: pos.coords.accuracy
          })
        } else resolve(null)
      },
      () => resolve(null),
      { timeout: 6000, enableHighAccuracy: true, maximumAge: 0 }
    )
  })
}

// Fetch with timeout helper
const fetchWithTimeout = async (url, ms = 5000, options = {}) => {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), ms)
  try {
    const res = await fetch(url, { signal: controller.signal, ...options })
    clearTimeout(tid)
    return res
  } catch (e) {
    clearTimeout(tid)
    throw e
  }
}

export const getRealVisitorGeo = async () => {
  // Start GPS in background — race with 3s timeout so it never blocks
  const gpsPromise = getMobileGPSLocation()
  const gpsRace = () => Promise.race([gpsPromise, new Promise(r => setTimeout(() => r(null), 3000))])

  // ── Tier 1: freeipapi.com (HTTPS, CORS-safe) ────────────────────────
  // Fields: ipAddress, cityName, regionName, countryName, countryCode,
  //         latitude, longitude, asnOrganization, timeZones[]
  try {
    const res = await fetchWithTimeout('https://freeipapi.com/api/json', 5000, { mode: 'cors' })
    if (res.ok) {
      const d = await res.json()
      if (d?.ipAddress) {
        const gps = await gpsRace()
        return {
          ip: d.ipAddress,
          city: d.cityName || '—',
          region: d.regionName || '—',
          country: d.countryName || '—',
          countryCode: d.countryCode || '',
          flag: getFlagEmoji(d.countryCode),
          latitude: gps?.latitude ?? (d.latitude != null ? Number(d.latitude).toFixed(4) : null),
          longitude: gps?.longitude ?? (d.longitude != null ? Number(d.longitude).toFixed(4) : null),
          isp: d.asnOrganization || '—',
          timezone: d.timeZones?.[0] || '—',
        }
      }
    }
  } catch (_) {}

  // ── Tier 2: ipwho.is (HTTPS, CORS-safe) ─────────────────────────────
  // Fields: ip, city, region, country, country_code, latitude, longitude,
  //         connection.isp, connection.org, timezone.id, flag.emoji
  try {
    const res = await fetchWithTimeout('https://ipwho.is/', 5000, { mode: 'cors' })
    if (res.ok) {
      const d = await res.json()
      if (d?.success !== false && d?.ip) {
        const gps = await gpsRace()
        return {
          ip: d.ip,
          city: d.city || '—',
          region: d.region || '—',
          country: d.country || '—',
          countryCode: d.country_code || '',
          flag: d.flag?.emoji || getFlagEmoji(d.country_code),
          latitude: gps?.latitude ?? (d.latitude != null ? Number(d.latitude).toFixed(4) : null),
          longitude: gps?.longitude ?? (d.longitude != null ? Number(d.longitude).toFixed(4) : null),
          isp: d.connection?.isp || d.connection?.org || '—',
          timezone: d.timezone?.id || '—',
        }
      }
    }
  } catch (_) {}

  // ── Tier 3: ipapi.co (HTTPS, CORS-safe) ─────────────────────────────
  // Fields: ip, city, region, country_name, country_code, latitude, longitude,
  //         org, timezone
  try {
    const res = await fetchWithTimeout('https://ipapi.co/json/', 5000, { mode: 'cors' })
    if (res.ok) {
      const d = await res.json()
      if (d?.ip && !d?.error) {
        const gps = await gpsRace()
        return {
          ip: d.ip,
          city: d.city || '—',
          region: d.region || '—',
          country: d.country_name || '—',
          countryCode: d.country_code || '',
          flag: getFlagEmoji(d.country_code),
          latitude: gps?.latitude ?? (d.latitude != null ? Number(d.latitude).toFixed(4) : null),
          longitude: gps?.longitude ?? (d.longitude != null ? Number(d.longitude).toFixed(4) : null),
          isp: d.org || d.asn || '—',
          timezone: d.timezone || '—',
        }
      }
    }
  } catch (_) {}

  // ── Tier 4: ipify (IP only) → then reverse via freeipapi ─────────────
  try {
    const res = await fetchWithTimeout('https://api.ipify.org?format=json', 4000)
    if (res.ok) {
      const d = await res.json()
      if (d?.ip) {
        try {
          const r2 = await fetchWithTimeout(`https://freeipapi.com/api/json/${d.ip}`, 4000, { mode: 'cors' })
          if (r2.ok) {
            const d2 = await r2.json()
            if (d2?.ipAddress) {
              const gps = await gpsRace()
              return {
                ip: d2.ipAddress,
                city: d2.cityName || '—',
                region: d2.regionName || '—',
                country: d2.countryName || '—',
                countryCode: d2.countryCode || '',
                flag: getFlagEmoji(d2.countryCode),
                latitude: gps?.latitude ?? (d2.latitude != null ? Number(d2.latitude).toFixed(4) : null),
                longitude: gps?.longitude ?? (d2.longitude != null ? Number(d2.longitude).toFixed(4) : null),
                isp: d2.asnOrganization || '—',
                timezone: d2.timeZones?.[0] || '—',
              }
            }
          }
        } catch (_) {}
        // IP only, no geo
        const gps = await gpsRace()
        return {
          ip: d.ip,
          city: '—', region: '—', country: '—', countryCode: '', flag: '🌐',
          latitude: gps?.latitude ?? null, longitude: gps?.longitude ?? null,
          isp: '—', timezone: '—',
        }
      }
    }
  } catch (_) {}

  // ── Final fallback — zero fake data ──────────────────────────────────
  const gps = await gpsPromise
  return {
    ip: 'Detecting...',
    city: '—', region: '—', country: '—', countryCode: '', flag: '🌐',
    latitude: gps?.latitude ?? null, longitude: gps?.longitude ?? null,
    isp: '—', timezone: '—',
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
  else if (/samsung/i.test(ua)) browser = 'Samsung Browser'
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
    const codePoints = countryCode.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch (_) { return '🌐' }
}

// Safe Coordinate Formatter — never returns fake Karachi defaults
export const formatCoordinates = (lat, lng) => {
  const isValid = (v) =>
    v !== null && v !== undefined && v !== '' &&
    v !== 'undefined' && v !== 'null' && v !== '—' && !isNaN(Number(v))
  if (isValid(lat) && isValid(lng)) {
    return `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`
  }
  return 'Locating...'
}

export const FAKE_IPS = ['86.134.20.11', '35.212.89.104', '103.255.4.19', '115.186.160.4', '182.185.142.92']

// Purge fake IPs from both visitor logs and sessions in localStorage
export const purgeFakeData = () => {
  try {
    const visitors = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')
    const cleanV = visitors.filter(v => v && !FAKE_IPS.includes(v.ip))
    localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(cleanV))

    const sessions = JSON.parse(localStorage.getItem('NEXORA_ACTIVE_SESSIONS') || '[]')
    const cleanS = sessions.filter(s => s && !FAKE_IPS.includes(s.ip))
    localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify(cleanS))
  } catch (_) {}
}

// Log real visitor session into localStorage with section tracking
export const logRealTimeVisitor = (geo, activeSection = '#home', durationSeconds = 0) => {
  if (typeof window === 'undefined') return
  try {
    const { device, browser } = detectBrowserAndDevice()
    purgeFakeData()
    const existing = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')

    const currentVisitor = {
      id: 'VIS-' + Math.floor(1000 + Math.random() * 9000),
      ip: geo?.ip || 'Detecting...',
      country: geo?.country && geo.country !== '—' ? `${geo.country} ${geo?.flag || ''}`.trim() : '—',
      city: geo?.city || '—',
      latitude: geo?.latitude != null ? String(geo.latitude) : null,
      longitude: geo?.longitude != null ? String(geo.longitude) : null,
      isp: geo?.isp || '—',
      duration: durationSeconds > 0
        ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s`
        : 'Active Now',
      activeSection,
      device,
      browser,
      entrance: 'Direct Visit',
      lastActive: 'Just now',
      status: 'Active Online',
      radarX: Math.floor(20 + Math.random() * 60),
      radarY: Math.floor(20 + Math.random() * 60),
      timestamp: new Date().toISOString()
    }

    // Deduplicate by IP
    const sanitized = existing.filter(v => v && v.ip !== currentVisitor.ip && !FAKE_IPS.includes(v.ip))
    const updated = [currentVisitor, ...sanitized].slice(0, 20)
    localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(updated))

    // Broadcast to ALL open tabs including admin panel (cross-tab only)
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

// Update only the activeSection and duration for an existing visitor
export const updateVisitorSection = (ip, activeSection, durationSeconds) => {
  if (typeof window === 'undefined' || !ip || ip === 'Detecting...') return
  try {
    const existing = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')
    const updated = existing.map(v => {
      if (v.ip === ip) {
        return {
          ...v,
          activeSection,
          duration: durationSeconds > 0
            ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s`
            : 'Active Now',
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
