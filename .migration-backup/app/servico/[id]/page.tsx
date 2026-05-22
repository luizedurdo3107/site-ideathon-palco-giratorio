'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, Star, MapPin, CheckCircle, Share2, Heart, 
  Calendar, MessageCircle, Clock, Users, Music, 
  Instagram, Youtube, Globe, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

// Mock data - in real app would come from API
const services: Record<string, {
  id: number
  name: string
  type: string
  category: string
  rating: number
  reviews: number
  location: string
  price: string
  verified: boolean
  description: string
  images: string[]
  tags: string[]
  memberSince: string
  responseTime: string
  completedJobs: number
  socialLinks: { type: string; url: string }[]
  reviewsList: { id: number; author: string; avatar: string; rating: number; date: string; comment: string }[]
  portfolio: { id: number; title: string; image: string }[]
}> = {
  '1': {
    id: 1,
    name: 'Maria Silva',
    type: 'Cantora & Compositora',
    category: 'Músico',
    rating: 4.9,
    reviews: 127,
    location: 'São Paulo, SP',
    price: 'A partir de R$ 1.500',
    verified: true,
    description: 'Cantora profissional com mais de 15 anos de experiência em shows, eventos corporativos e casamentos. Especializada em MPB, Jazz e Bossa Nova, ofereço um repertório variado que se adapta a qualquer ocasião. Trabalho com banda completa ou formato acústico, sempre garantindo uma experiência musical única e memorável para seu evento.',
    images: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop',
    ],
    tags: ['MPB', 'Jazz', 'Bossa Nova', 'Pop', 'Casamentos', 'Eventos Corporativos'],
    memberSince: 'Janeiro 2022',
    responseTime: 'Responde em até 2 horas',
    completedJobs: 156,
    socialLinks: [
      { type: 'instagram', url: 'https://instagram.com' },
      { type: 'youtube', url: 'https://youtube.com' },
      { type: 'website', url: 'https://example.com' },
    ],
    reviewsList: [
      { 
        id: 1, 
        author: 'Carlos Mendes', 
        avatar: 'https://i.pravatar.cc/40?img=11',
        rating: 5, 
        date: '15 de março de 2024',
        comment: 'Maria foi incrível no nosso casamento! A voz dela é simplesmente linda e ela soube escolher o repertório perfeito para cada momento da festa. Super recomendo!'
      },
      { 
        id: 2, 
        author: 'Ana Paula Costa', 
        avatar: 'https://i.pravatar.cc/40?img=12',
        rating: 5, 
        date: '2 de março de 2024',
        comment: 'Contratamos a Maria para um evento corporativo e ela superou todas as expectativas. Muito profissional e talentosa.'
      },
      { 
        id: 3, 
        author: 'Roberto Santos', 
        avatar: 'https://i.pravatar.cc/40?img=13',
        rating: 4, 
        date: '18 de fevereiro de 2024',
        comment: 'Ótima apresentação, repertório variado e muita simpatia. O único ponto seria uma melhor comunicação sobre os equipamentos necessários.'
      },
    ],
    portfolio: [
      { id: 1, title: 'Show no Blue Note SP', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop' },
      { id: 2, title: 'Casamento Villa Bisutti', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop' },
      { id: 3, title: 'Evento Corporativo IBM', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop' },
      { id: 4, title: 'Festival de Jazz', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop' },
    ],
  },
}

// Default service for fallback
const defaultService = services['1']

export default function ServicoPage() {
  const params = useParams()
  const serviceId = params?.id as string
  const service = services[serviceId] || defaultService
  
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % service.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + service.images.length) % service.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-32 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/explorar"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para busca
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden bg-card">
                <div className="aspect-[16/10] relative">
                  <img
                    src={service.images[currentImage]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {currentImage + 1} / {service.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 p-4">
                  {service.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Header - Only on mobile */}
              <div className="lg:hidden space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
                      {service.verified && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground">{service.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="border-border">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>
                </div>

                <p className="text-xl font-bold text-primary">{service.price}</p>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="sobre" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border h-auto p-1 rounded-xl">
                  <TabsTrigger value="sobre" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Sobre
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Portfólio
                  </TabsTrigger>
                  <TabsTrigger value="avaliacoes" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Avaliações
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sobre" className="mt-6 space-y-6">
                  {/* Description */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Descrição</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{service.completedJobs}</p>
                      <p className="text-sm text-muted-foreground">Trabalhos</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                      <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{service.rating}</p>
                      <p className="text-sm text-muted-foreground">Avaliação</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                      <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">2h</p>
                      <p className="text-sm text-muted-foreground">Resposta</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 text-center">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">2022</p>
                      <p className="text-sm text-muted-foreground">Membro desde</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolio" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.portfolio.map((item) => (
                      <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-foreground">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="avaliacoes" className="mt-6 space-y-4">
                  {/* Rating Summary */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-foreground">{service.rating}</p>
                        <div className="flex items-center gap-1 justify-center my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{service.reviews} avaliações</p>
                      </div>
                      <Separator orientation="vertical" className="h-20" />
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-sm w-3">{stars}</span>
                            <Star className="w-3 h-3 text-primary fill-primary" />
                            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 10 : 0}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  {service.reviewsList.map((review) => (
                    <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{review.author}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Contact Card */}
            <div className="hidden lg:block">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-28 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-foreground">{service.name}</h2>
                      {service.verified && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{service.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="border-border">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Rating & Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>
                </div>

                <Separator />

                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Valor</p>
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="w-full h-12 border-border gap-2">
                    <Calendar className="w-5 h-5" />
                    Verificar Disponibilidade
                  </Button>
                </div>

                <Separator />

                {/* Response Time */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{service.responseTime}</span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {service.socialLinks.map((link) => (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      {link.type === 'instagram' && <Instagram className="w-5 h-5" />}
                      {link.type === 'youtube' && <Youtube className="w-5 h-5" />}
                      {link.type === 'website' && <Globe className="w-5 h-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Valor</p>
            <p className="text-lg font-bold text-primary">{service.price}</p>
          </div>
          <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <MessageCircle className="w-5 h-5" />
            Contatar
          </Button>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}
