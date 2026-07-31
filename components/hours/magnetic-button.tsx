'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'solid' | 'ghost'
  as?: 'link' | 'button'
  href?: string
  onClick?: () => void
  ariaLabel?: string
}

export function MagneticButton({
  children,
  className = '',
  variant = 'solid',
  as = 'link',
  href = '#',
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-tight transition-shadow duration-500 will-change-transform active:scale-95'
  const styles =
    variant === 'solid'
      ? 'bg-pink-hot text-white shadow-[0_10px_40px_-12px_rgba(236,12,120,0.7)] hover:shadow-[0_18px_60px_-10px_rgba(236,12,120,0.9)]'
      : 'border border-blush/30 bg-white/5 text-blush backdrop-blur-sm hover:border-blush/60'

  const sharedProps = {
    ref,
    'aria-label': ariaLabel,
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    whileHover: reduce ? undefined : { scale: 1.03 },
    whileTap: reduce ? undefined : { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    className: `${base} ${styles} ${className}`,
  }

  if (as === 'button') {
    return (
      <motion.button type="button" {...sharedProps}>
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...sharedProps}
    >
      {children}
    </motion.a>
  )
}
