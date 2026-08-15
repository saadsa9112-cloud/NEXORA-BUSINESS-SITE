import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollReveal({
  children,
  className = '',
  variant = 'fadeUp', // fadeUp | fadeIn | scaleUp | slideLeft | slideRight
  delay = 0,
  duration = 0.6,
  viewportMargin = '-60px',
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  const variantsMap = {
    fadeUp: {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.95, y: 15 },
      visible: { opacity: 1, scale: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
  }

  const activeVariant = variantsMap[variant] || variantsMap.fadeUp

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={activeVariant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
