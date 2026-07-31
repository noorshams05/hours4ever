'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'

const FAQS = [
  {
    q: 'Is this actually prescribed by a real doctor?',
    a: 'Yes. Every order is reviewed by a licensed U.S. physician. If a treatment is appropriate for you, they write the prescription — no in-person visit required.',
  },
  {
    q: 'How discreet is the packaging?',
    a: 'Completely. Your treatment ships in a plain, unmarked box with no indication of what is inside or who it is from. Only you will know.',
  },
  {
    q: 'What ingredients do you use?',
    a: 'We use FDA-approved active ingredients — sildenafil and tadalafil — the same medications you would receive at a pharmacy, sourced from licensed U.S. pharmacies.',
  },
  {
    q: 'Can I cancel or pause anytime?',
    a: 'Absolutely. There are no long-term commitments. Manage, pause, or cancel your plan anytime from your account in a couple of taps.',
  },
  {
    q: 'What if it doesn’t work for me?',
    a: 'Your physician can adjust your dosage or switch your treatment at no extra cost. Ongoing support is included with every plan.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-hot">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1] tracking-[-0.02em] text-blush">
              Questions,{' '}
              <span className="font-serif font-normal italic text-pink-hot">
                answered
              </span>
              .
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xs text-pretty leading-relaxed text-blush/50">
              Still curious? Our care team is a message away, discreetly and
              without judgment.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-blush md:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-pink-hot"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-[15px] leading-relaxed text-blush/60">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
