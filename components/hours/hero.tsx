'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { MagneticButton } from './magnetic-button'
import { RevealWords } from './reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const productY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink pt-28 pb-16 md:pt-32"
    >
      {/* Ambient radial glow — the logo's gradient DNA, not the logo itself */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: glowY, scale: glowScale }}
        className="pointer-events-none absolute -right-[10%] top-1/2 -z-10 h-[85vh] w-[85vh] -translate-y-1/2 rounded-full opacity-70 blur-[90px] hours-radial-glow md:-right-[5%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] bottom-0 -z-10 h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px] hours-radial-glow"
      />

      {/* Slowly breathing emblem behind the headline */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:block"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
      >
        <Image
          src="/hours-logo.png"
          alt=""
          width={720}
          height={720}
          className="h-[70vh] w-[70vh]"
        />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blush/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-blush/70 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pink-hot" />
            Prescription ED treatment
          </motion.p>

          <h1 className="max-w-[15ch] text-balance font-sans text-[clamp(3.25rem,8vw,7rem)] font-black leading-[0.92] tracking-[-0.03em] text-blush">
            <RevealWords text="Meet the most" delay={0.2} trigger="mount" />
            <br />
            <RevealWords text="{effective} ED" delay={0.42} trigger="mount" />
            <br />
            <RevealWords text="treatment made" delay={0.64} trigger="mount" />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-7 max-w-md text-pretty text-base leading-relaxed text-blush/60 md:text-lg"
          >
            Doctor-prescribed. Discreetly delivered. Made to work when it
            matters — so you have hours, not minutes.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#pricing" className="!px-10 !py-4 !text-base">
              Start your visit
            </MagneticButton>
            <a
              href="#how"
              className="text-sm font-medium text-blush/60 underline-offset-4 transition-colors hover:text-blush hover:underline"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Floating product shot */}
        <motion.div
          style={reduce ? undefined : { y: productY }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -18, 0] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-6 h-16 rounded-full bg-pink-hot/40 blur-2xl"
            />
            <Image
              src="/hours-product.png"
              alt="Hours ED treatment — matte black packaging with a pill bottle"
              width={640}
              height={640}
              className="relative h-auto w-full object-contain"
              style={{
                maskImage:
                  'radial-gradient(ellipse 78% 78% at 50% 46%, #000 55%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 78% 78% at 50% 46%, #000 55%, transparent 100%)',
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* soft gradient wipe into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink"
      />
    </section>
  )
}
