import { Faq } from '@/components/hours/faq'
import { FinalCta, SiteFooter } from '@/components/hours/footer'
import { Hero } from '@/components/hours/hero'
import { HowItWorks } from '@/components/hours/how-it-works'
import { Pricing } from '@/components/hours/pricing'
import { Reviews } from '@/components/hours/reviews'
import { SiteHeader } from '@/components/hours/site-header'
import { TrustBar } from '@/components/hours/trust-bar'

export default function Page() {
  return (
    <main className="relative bg-ink">
      <SiteHeader />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
