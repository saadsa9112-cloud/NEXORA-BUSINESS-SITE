import { useEffect } from 'react'

/**
 * Hook that triggers a callback when an element enters the viewport.
 * Used for scroll-reveal animations throughout the site.
 */
export function useReveal(selector = '.reveal', threshold = 0.15) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            // Once revealed, stop observing for performance
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, threshold])
}

/**
 * Hook that adds 'revealed' class to elements matching the selector
 * when they enter the viewport. Supports multiple selectors.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selectors = ['.reveal', '.reveal-left', '.reveal-right']
    const allElements = selectors.flatMap((sel) =>
      Array.from(document.querySelectorAll(sel))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    allElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
