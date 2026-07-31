'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'span' | 'li' | 'p' | 'section'
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Splits a string into words and staggers each one up as it enters view.
 * Mark serif accent words by wrapping them in braces in the input,
 * e.g. "Meet the most {effective} ED treatment".
 */
export function RevealWords({
  text,
  className,
  accentClassName = 'font-serif italic font-normal text-pink-hot',
  delay = 0,
  stagger = 0.07,
  trigger = 'view',
}: {
  text: string
  className?: string
  accentClassName?: string
  delay?: number
  stagger?: number
  trigger?: 'view' | 'mount'
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text.replace(/[{}]/g, '')}>
      {words.map((raw, i) => {
        const isAccent = raw.startsWith('{') && raw.endsWith('}')
        const word = raw.replace(/[{}]/g, '')
        const anim = { y: '0%' }
        const motionProps =
          trigger === 'mount'
            ? { animate: reduce ? undefined : anim }
            : {
                whileInView: reduce ? undefined : anim,
                viewport: { once: true, margin: '-60px' },
              }
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            <motion.span
              className={`inline-block ${isAccent ? accentClassName : ''}`}
              initial={reduce ? false : { y: '110%' }}
              {...motionProps}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: delay + i * stagger,
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
