'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ClipboardCheck, PackageCheck, Stethoscope } from 'lucide-react'
import { useRef } from 'react'

const STEPS = [
  {
    n: '01',
    icon: ClipboardCheck,
    title: 'Answer a few questions',
    body: 'A short, confidential health questionnaire — about five minutes, entirely online. No awkward appointments.',
  },
  {
    n: '02',
    icon: Stethoscope,
    title: 'A doctor reviews',
    body: 'A licensed U.S. physician reviews your answers and, if appropriate, prescribes a treatment tailored to you.',
  },
  {
    n: '03',
    icon: PackageCheck,
    title: 'Shipped discreetly',
    body: 'Your treatment arrives in unmarked packaging, free and fast. Refills adjust automatically — cancel anytime.',
  },
]

export function HowItWorks() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%'])

  return (
    <section
      ref={ref}
      id="how"
      className="relative bg-paper text-ink"
      style={{ height: reduce ? 'auto' : '280vh' }}
    >
      <div
        className={
          reduce
            ? 'px-5 py-24 md:px-8'
            : 'sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden px-5 py-20 md:px-8'
        }
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-deep">
            How it works
          </p>
          <h2 className="max-w-2xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-black leading-[0.98] tracking-[-0.02em]">
            Three steps between{' '}
            <span className="font-serif font-normal italic text-pink-hot">
              you
            </span>{' '}
            and better.
          </h2>

          {/* Connector line */}
          <div className="relative mt-16 md:mt-24">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-ink/10 md:block" />
            {!reduce && (
              <motion.div
                style={{ width: lineWidth }}
                className="absolute left-0 top-8 hidden h-px bg-pink-hot md:block"
              />
            )}

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
              {STEPS.map((step, i) => (
                <Step
                  key={step.n}
                  step={step}
                  index={i}
                  progress={scrollYProgress}
                  reduce={!!reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  progress,
  reduce,
}: {
  step: (typeof STEPS)[number]
  index: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  // Each step activates as the line reaches it.
  const start = 0.15 + index * 0.25
  const active = useTransform(progress, [start - 0.08, start], [0, 1])
  const opacity = useTransform(active, [0, 1], [0.45, 1])
  const dotScale = useTransform(active, [0, 1], [1, 1.15])
  const Icon = step.icon

  return (
    <motion.div style={reduce ? undefined : { opacity }} className="relative">
      <motion.span
        style={reduce ? undefined : { scale: dotScale }}
        className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-[0_8px_30px_-12px_rgba(43,10,25,0.25)]"
      >
        <Icon className="h-6 w-6 text-pink-hot" strokeWidth={1.6} />
      </motion.span>
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-sm italic text-pink-deep">
          {step.n}
        </span>
        <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
      </div>
      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/60">
        {step.body}
      </p>
    </motion.div>
  )
}
