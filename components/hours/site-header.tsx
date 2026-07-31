'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { MagneticButton } from './magnetic-button'

const NAV = [
  { label: 'Shop', href: '#pricing' },
  { label: 'How it Works', href: '#how' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24)
  })

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex items-center justify-between gap-6 px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-8 ${
          scrolled
            ? 'my-2 max-w-5xl rounded-full border border-white/10 bg-maroon-black/60 py-2.5 backdrop-blur-xl'
            : 'my-0 max-w-7xl border border-transparent bg-transparent py-5'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Hours home">
          <Image
            src="/hours-logo.png"
            alt="Hours logo"
            width={40}
            height={40}
            className={`transition-all duration-500 ${scrolled ? 'h-8 w-8' : 'h-10 w-10'}`}
            priority
          />
          <span className="font-serif text-lg tracking-tight text-blush">
            Hours
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-blush/70 transition-colors hover:text-blush"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-pink-hot transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton
            href="#pricing"
            className="!px-6 !py-2.5 !text-[13px]"
          >
            Get started
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-px w-5 bg-blush transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
          />
          <span
            className={`h-px w-5 bg-blush transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-3 mt-1 flex flex-col gap-1 rounded-3xl border border-white/10 bg-maroon-black/90 p-3 backdrop-blur-xl md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-blush/80 transition-colors hover:bg-white/5 hover:text-blush"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-pink-hot px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Get started
          </a>
        </motion.nav>
      )}
    </motion.header>
  )
}
