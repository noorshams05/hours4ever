'use client'

import { Star } from 'lucide-react'
import { Reveal } from './reveal'

type Review = {
  quote: string
  name: string
  initials: string
  detail: string
}

const REVIEWS: Review[] = [
  {
    quote:
      'The whole thing took five minutes and nobody had to know. It just showed up, plain box, and it works exactly like they said.',
    name: 'Marcus T.',
    initials: 'MT',
    detail: 'Member since 2023',
  },
  {
    quote:
      'I was skeptical about anything online, but a real doctor actually reviewed my history and answered my questions. That earned my trust.',
    name: 'David R.',
    initials: 'DR',
    detail: 'Monthly plan',
  },
  {
    quote:
      'Confidence back, awkward pharmacy trips gone. The name fits — it genuinely lasts. Wish I had done this years ago.',
    name: 'James P.',
    initials: 'JP',
    detail: 'Quarterly plan',
  },
  {
    quote:
      'Discreet is an understatement. Fast shipping, clear instructions, and the price is a fraction of what I expected to pay.',
    name: 'Anthony K.',
    initials: 'AK',
    detail: 'Member since 2024',
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-hot">
                Reviews
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1] tracking-[-0.02em] text-blush">
                Quietly{' '}
                <span className="font-serif font-normal italic text-pink-hot">
                  changing
                </span>{' '}
                things.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-pink-hot text-pink-hot"
                  />
                ))}
              </div>
              <span className="text-sm text-blush/60">
                4.8 average — 12,000+ men
              </span>
            </div>
          </Reveal>
        </div>

        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 0.07}
              className="min-w-[82%] snap-center sm:min-w-[60%] md:min-w-0"
            >
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-pink-hot/40">
                <div className="mb-4 flex" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-pink-hot text-pink-hot"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-blush/75">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-hot/15 text-sm font-semibold text-pink-hot">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-blush">
                      {r.name}
                    </span>
                    <span className="block text-xs text-blush/45">
                      {r.detail}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
