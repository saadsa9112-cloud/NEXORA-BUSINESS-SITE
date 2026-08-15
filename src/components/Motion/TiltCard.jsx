import { useState, useRef, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glowColor = 'rgba(0, 102, 255, 0.12)',
  disabled = false,
  onClick,
  ...props
}) {
  const cardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Detect touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Raw motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 })

  // Map mouse position [-0.5, 0.5] to rotation [-maxTilt, maxTilt]
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt])

  // Glow position percentage
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (disabled || isMobile || shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)

    setGlowPos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    })
  }

  const handleMouseEnter = () => {
    if (disabled || isMobile || shouldReduceMotion) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (disabled || isMobile || shouldReduceMotion) return
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  if (disabled || isMobile || shouldReduceMotion) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Interactive radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  )
}
