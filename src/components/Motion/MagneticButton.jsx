import { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'

export default function MagneticButton({
  children,
  className = '',
  distance = 0.3, // Strength multiplier (0.2 to 0.4)
  maxOffset = 8,  // Max pixel pull
  onClick,
  ...props
}) {
  const btnRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 250, damping: 18, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (isMobile || shouldReduceMotion || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rawX = (e.clientX - centerX) * distance
    const rawY = (e.clientY - centerY) * distance

    // Clamp within maxOffset
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, rawX))
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, rawY))

    x.set(clampedX)
    y.set(clampedY)
  }

  const handleMouseLeave = () => {
    if (isMobile || shouldReduceMotion) return
    x.set(0)
    y.set(0)
  }

  if (isMobile || shouldReduceMotion) {
    return (
      <button
        ref={btnRef}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="inline-block"
    >
      <div onClick={onClick} className={className} {...props}>
        {children}
      </div>
    </motion.div>
  )
}
