'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ITEMS = [
  'Licensed U.S. physicians',
  'FDA-approved ingredients',
  'Discreet, unmarked packaging',
  '100% online — no waiting rooms',
  'Free 2-day shipping',
  'Cancel anytime',
]

export function TrustBar() {
  const reduce = useReducedMotion()
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section
      aria-label="Trust highlights"
      className="relative overflow-hidden border-y border-white/5 bg-ink py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      {reduce ? (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5">
          {ITEMS.map((item) => (
            <TrustItem key={item} label={item} />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max items-center gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((item, i) => (
            <TrustItem key={`${item}-${i}`} label={item} />
          ))}
        </motion.div>
      )}
    </section>
  )
}

function TrustItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-blush/50">
      <span className="h-1 w-1 rounded-full bg-pink-hot" />
      {label}
    </span>
  )
}
