'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { CountUp } from './count-up'
import { MagneticButton } from './magnetic-button'
import { Reveal } from './reveal'

type Tier = {
  name: string
  price: number
  cadence: string
  blurb: string
  features: string[]
  popular?: boolean
  checkoutUrl: string
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    price: 49,
    cadence: 'trial pack',
    blurb: 'Try the most powerful multi-ingredient ED formula available today. No hype. JUST RESULTS.',
    features: [
      'Doctor consultation included',
      'Most powerful multi-ingredient ED formula',
      'Ships when you order',
      'No subscription required',
    ],
    checkoutUrl: 'https://hours4ever.com/cart/48806219514080:1',
  },
  {
    name: 'Monthly',
    price: 99,
    cadence: 'per month',
    blurb: 'Our most popular plan. Best value, always ready when you need it.',
    features: [
      'Everything in Starter',
      'Full monthly supply',
      'Free discreet 2-day shipping',
      'Free ongoing physician support',
      'Pause or cancel anytime',
    ],
    popular: true,
    checkoutUrl: 'https://hours4ever.com/cart/48806219514080:1',
  },
  {
    name: 'Quarterly',
    price: 249,
    cadence: 'per quarter',
    blurb: 'Set it and forget it. Maximum savings and continuous coverage.',
    features: [
      'Everything in Monthly',
      'Best per-dose pricing',
      'Priority pharmacy fulfillment',
      'Dedicated care coordinator',
    ],
    checkoutUrl: 'https://hours4ever.com/cart/48806219514080:1',
  },
]
export function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink px-5 py-24 md:px-8 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[40vh] w-[70vh] -translate-x-1/2 rounded-full opacity-25 blur-[120px] hours-radial-glow"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-hot">
              Simple pricing
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1] tracking-[-0.02em] text-blush">
              Pay for what{' '}
              <span className="font-serif font-normal italic text-pink-hot">
                works
              </span>
              .
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-blush/50">
              No hidden fees, no insurance headaches. Consultation always
              included. Change or cancel whenever you like.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <TiltCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ tier }: { tier: Tier }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const transform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg)`

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { transform }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative flex h-full flex-col rounded-3xl border p-8 will-change-transform ${
        tier.popular
          ? 'border-pink-hot/60 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_0_60px_-15px_rgba(236,12,120,0.55)]'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-pink-hot px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_8px_24px_-8px_rgba(236,12,120,0.9)]">
          Most popular
        </span>
      )}

      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blush/70">
        {tier.name}
      </h3>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-5xl font-black tracking-tight text-blush">
          <CountUp to={tier.price} prefix="$" />
        </span>
        <span className="text-sm text-blush/50">{tier.cadence}</span>
      </div>

      <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-blush/55">
        {tier.blurb}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-blush/70">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                tier.popular ? 'bg-pink-hot/20' : 'bg-white/5'
              }`}
            >
              <Check className="h-3 w-3 text-pink-hot" strokeWidth={2.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <MagneticButton
         href={tier.checkoutUrl}
          variant={tier.popular ? 'solid' : 'ghost'}
          className="w-full"
        >
          Choose {tier.name}
        </MagneticButton>
      </div>
    </motion.div>
  )
}
