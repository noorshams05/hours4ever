'use client'

import Image from 'next/image'
import { MagneticButton } from './magnetic-button'
import { Reveal, RevealWords } from './reveal'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-28 md:px-8 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px] hours-radial-glow"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-blush">
          <RevealWords text="Give yourself the" />
          <br />
          <RevealWords text="{hours} you deserve." delay={0.15} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-blush/55">
            Start a confidential visit today. It takes about five minutes, and a
            doctor takes it from there.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-9 flex justify-center">
            <MagneticButton href="#pricing" className="!px-12 !py-4 !text-base">
              Start your visit
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: ['How it works', 'Pricing', 'Reviews', 'FAQ'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Telehealth consent', 'Shipping'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/hours-logo.png"
                alt="Hours logo"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-serif text-lg text-blush">Hours</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-blush/45">
              Discreet, doctor-prescribed ED treatment delivered to your door.
              Confidence, on your schedule.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-blush/60">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blush/45 transition-colors hover:text-blush"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-blush/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hours Health, Inc. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            This is a design concept for demonstration purposes only. Not
            medical advice. Prescription products require an evaluation by a
            licensed physician.
          </p>
        </div>
      </div>
    </footer>
  )
}
