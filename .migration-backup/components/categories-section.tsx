'use client'

import Link from 'next/link'
import { Mic2, Lightbulb, Speaker, Camera, Palette, Theater, Music, Clapperboard, PartyPopper, ArrowRight } from 'lucide-react'

const categories = [
  { icon: Mic2, label: 'Cantores', count: 847, href: '/explorar?categoria=cantores', color: 'from-primary/20 to-primary/5', iconColor: 'text-primary' },
  { icon: Music, label: 'Músicos', count: 1234, href: '/explorar?categoria=musicos', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-500' },
  { icon: Theater, label: 'Atores', count: 523, href: '/explorar?categoria=atores', color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-500' },
  { icon: Palette, label: 'Artistas Visuais', count: 389, href: '/explorar?categoria=visuais', color: 'from-pink-500/20 to-pink-500/5', iconColor: 'text-pink-500' },
  { icon: Clapperboard, label: 'Dançarinos', count: 456, href: '/explorar?categoria=dancarinos', color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-500' },
  { icon: Lightbulb, label: 'Iluminação', count: 312, href: '/explorar?categoria=iluminacao', color: 'from-yellow-500/20 to-yellow-500/5', iconColor: 'text-yellow-500' },
  { icon: Speaker, label: 'Som', count: 278, href: '/explorar?categoria=som', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-500' },
  { icon: Camera, label: 'Fotografia', count: 567, href: '/explorar?categoria=fotografia', color: 'from-rose-500/20 to-rose-500/5', iconColor: 'text-rose-500' },
  { icon: PartyPopper, label: 'Eventos', count: 189, href: '/explorar?categoria=eventos', color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-500' },
]

export function CategoriesSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">Categorias</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight text-balance">
            Encontre o Profissional Ideal
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore todas as categorias e encontre exatamente o que você precisa para seu evento ou projeto artístico.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.label}
                href={category.href}
                className="group relative bg-card/50 border border-border/50 rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:border-border hover:bg-card card-hover"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-muted/50 ${category.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors">{category.label}</h3>
                  <p className="text-sm text-muted-foreground">{category.count.toLocaleString('pt-BR')} disponíveis</p>
                  
                  {/* Arrow indicator on hover */}
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
