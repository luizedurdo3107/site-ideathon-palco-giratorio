import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { FeaturedSection } from '@/components/featured-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
