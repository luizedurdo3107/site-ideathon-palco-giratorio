import { Link } from 'wouter'
import { ArrowRight, Play, Star, Mic2, Lightbulb, Speaker } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const stats = [
  { value: '15k+', label: 'Eventos Realizados' },
  { value: '98%', label: 'Satisfação' },
  { value: '500+', label: 'Cidades' },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="hidden lg:block absolute top-1/2 right-[10%] -translate-y-1/2">
          <div className="relative w-[420px] h-[420px]">
            <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-glow" />
            <div className="absolute inset-6 rounded-full border border-primary/15" />
            <div className="absolute inset-12 rounded-full border border-primary/20" />
            <div className="absolute inset-20 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className={`max-w-xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">+2.500 Artistas Verificados</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-foreground">O Palco é </span>
              <span className="gradient-text relative inline-block">
                Seu
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 10C20 2 80 2 98 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed max-w-md">
              Conectamos artistas, técnicos e os melhores equipamentos do mercado para criar experiências{' '}
              <span className="text-foreground font-medium">inesquecíveis</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link href="/explorar">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-7 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Explorar Marketplace
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 h-12 px-7 text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium">
                <Play className="w-4 h-4" />
                Ver Como Funciona
              </Button>
            </div>
            <div className="flex gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <p className="text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            <div className={`absolute top-4 right-20 glass border border-border/50 rounded-2xl p-4 flex items-center gap-4 shadow-2xl card-hover animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0s', transitionDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><Mic2 className="w-6 h-6 text-primary" /></div>
              <div><p className="font-semibold text-foreground">Cantores</p><p className="text-sm text-muted-foreground">847 disponíveis</p></div>
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 right-0 glass border border-border/50 rounded-2xl p-4 flex items-center gap-4 shadow-2xl card-hover animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.5s', transitionDelay: '400ms' }}>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center"><Lightbulb className="w-6 h-6 text-yellow-500" /></div>
              <div><p className="font-semibold text-foreground">Iluminação</p><p className="text-sm text-muted-foreground">456 serviços</p></div>
            </div>
            <div className={`absolute bottom-8 right-16 glass border border-border/50 rounded-2xl p-4 flex items-center gap-4 shadow-2xl card-hover animate-float ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1s', transitionDelay: '600ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><Speaker className="w-6 h-6 text-primary" /></div>
              <div><p className="font-semibold text-foreground">Equipamentos</p><p className="text-sm text-muted-foreground">2.3k listados</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
