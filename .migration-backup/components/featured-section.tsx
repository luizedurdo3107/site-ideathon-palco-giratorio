'use client'

import Link from 'next/link'
import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const featuredServices = [
  {
    id: 1,
    name: 'Maria Silva',
    type: 'Cantora & Compositora',
    category: 'Músico',
    rating: 4.9,
    reviews: 127,
    location: 'São Paulo, SP',
    price: 'A partir de R$ 1.500',
    verified: true,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
    tags: ['MPB', 'Jazz', 'Bossa Nova'],
  },
  {
    id: 2,
    name: 'Som & Luz Eventos',
    type: 'Equipamentos Profissionais',
    category: 'Equipamento',
    rating: 4.8,
    reviews: 89,
    location: 'Rio de Janeiro, RJ',
    price: 'A partir de R$ 3.000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    tags: ['Som', 'Iluminação', 'Palco'],
  },
  {
    id: 3,
    name: 'Companhia de Teatro Aurora',
    type: 'Teatro & Performance',
    category: 'Teatro',
    rating: 5.0,
    reviews: 56,
    location: 'Belo Horizonte, MG',
    price: 'Sob consulta',
    verified: true,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=400&fit=crop',
    tags: ['Teatro', 'Performance', 'Eventos Corporativos'],
  },
  {
    id: 4,
    name: 'DJ Anderson',
    type: 'DJ & Produtor Musical',
    category: 'DJ',
    rating: 4.7,
    reviews: 203,
    location: 'Curitiba, PR',
    price: 'A partir de R$ 800',
    verified: true,
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&h=400&fit=crop',
    tags: ['House', 'Techno', 'Pop'],
  },
  {
    id: 5,
    name: 'Studio Arte Visual',
    type: 'Fotografia & Vídeo',
    category: 'Fotografia',
    rating: 4.9,
    reviews: 178,
    location: 'Salvador, BA',
    price: 'A partir de R$ 2.000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop',
    tags: ['Fotografia', 'Vídeo', 'Edição'],
  },
  {
    id: 6,
    name: 'Ballet Contemporâneo SP',
    type: 'Dança & Coreografia',
    category: 'Dança',
    rating: 4.8,
    reviews: 67,
    location: 'São Paulo, SP',
    price: 'Sob consulta',
    verified: true,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=400&fit=crop',
    tags: ['Ballet', 'Contemporâneo', 'Shows'],
  },
]

export function FeaturedSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">Destaques</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Profissionais em Alta
            </h2>
          </div>
          <Link href="/explorar">
            <Button variant="outline" className="border-border/50 hover:border-border hover:bg-muted/50 gap-2 group">
              Ver todos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredServices.map((service) => (
            <Link
              key={service.id}
              href={`/servico/${service.id}`}
              className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 font-medium">
                    {service.category}
                  </Badge>
                </div>
                {service.verified && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{service.type}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2.5 py-1.5 shrink-0">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-semibold">{service.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{service.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-5 border-t border-border/50 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{service.price}</p>
                  <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Ver perfil
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
