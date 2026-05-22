'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, MapPin, Star, CheckCircle, Grid3X3, List, X } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const categories = [
  { value: 'todos', label: 'Todas Categorias' },
  { value: 'cantores', label: 'Cantores' },
  { value: 'musicos', label: 'Músicos' },
  { value: 'bandas', label: 'Bandas' },
  { value: 'djs', label: 'DJs' },
  { value: 'atores', label: 'Atores' },
  { value: 'dancarinos', label: 'Dançarinos' },
  { value: 'artistas-visuais', label: 'Artistas Visuais' },
  { value: 'iluminacao', label: 'Iluminação' },
  { value: 'som', label: 'Som' },
  { value: 'fotografia', label: 'Fotografia' },
  { value: 'video', label: 'Vídeo' },
  { value: 'espacos', label: 'Espaços' },
  { value: 'palco', label: 'Palco e Estrutura' },
]

const services = [
  {
    id: 1,
    name: 'Maria Silva',
    type: 'Cantora & Compositora',
    category: 'Músico',
    rating: 4.9,
    reviews: 127,
    location: 'São Paulo, SP',
    price: 1500,
    priceLabel: 'A partir de R$ 1.500',
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
    price: 3000,
    priceLabel: 'A partir de R$ 3.000',
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
    price: 5000,
    priceLabel: 'Sob consulta',
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
    price: 800,
    priceLabel: 'A partir de R$ 800',
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
    price: 2000,
    priceLabel: 'A partir de R$ 2.000',
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
    price: 4000,
    priceLabel: 'Sob consulta',
    verified: true,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=400&fit=crop',
    tags: ['Ballet', 'Contemporâneo', 'Shows'],
  },
  {
    id: 7,
    name: 'Banda Rock Revolution',
    type: 'Banda de Rock',
    category: 'Músico',
    rating: 4.6,
    reviews: 145,
    location: 'Porto Alegre, RS',
    price: 2500,
    priceLabel: 'A partir de R$ 2.500',
    verified: true,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tags: ['Rock', 'Pop Rock', 'Covers'],
  },
  {
    id: 8,
    name: 'Espaço Cultural Jardins',
    type: 'Espaço para Eventos',
    category: 'Espaço',
    rating: 4.9,
    reviews: 234,
    location: 'São Paulo, SP',
    price: 8000,
    priceLabel: 'A partir de R$ 8.000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop',
    tags: ['Shows', 'Teatro', 'Exposições'],
  },
  {
    id: 9,
    name: 'Grafiteiro Paulo Arte',
    type: 'Arte Urbana & Murais',
    category: 'Artista Visual',
    rating: 5.0,
    reviews: 45,
    location: 'Recife, PE',
    price: 1200,
    priceLabel: 'A partir de R$ 1.200',
    verified: true,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop',
    tags: ['Grafite', 'Murais', 'Arte Urbana'],
  },
]

export default function ExplorarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('relevancia')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'todos' || service.category.toLowerCase().includes(selectedCategory)
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1]
    const matchesVerified = !showVerifiedOnly || service.verified
    return matchesSearch && matchesCategory && matchesPrice && matchesVerified
  })

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'preco-menor':
        return a.price - b.price
      case 'preco-maior':
        return b.price - a.price
      case 'avaliacao':
        return b.rating - a.rating
      case 'reviews':
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="text-foreground font-medium mb-4 block">Faixa de Preço</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={10000}
          step={100}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>R$ {priceRange[0].toLocaleString()}</span>
          <span>R$ {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="verified"
          checked={showVerifiedOnly}
          onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
        />
        <Label htmlFor="verified" className="text-sm text-foreground cursor-pointer">
          Apenas verificados
        </Label>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-foreground font-medium mb-3 block">Categorias</Label>
        <div className="space-y-2">
          {categories.slice(0, 8).map((cat) => (
            <div key={cat.value} className="flex items-center gap-2">
              <Checkbox
                id={cat.value}
                checked={selectedCategory === cat.value}
                onCheckedChange={() => setSelectedCategory(cat.value)}
              />
              <Label htmlFor={cat.value} className="text-sm text-foreground cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-24 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Explorar Marketplace
            </h1>
            <p className="text-muted-foreground">
              Encontre artistas, equipamentos e serviços para seu evento
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar artistas, equipamentos, serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 h-12 bg-card border-border">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 h-12 bg-card border-border">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="avaliacao">Melhor avaliação</SelectItem>
                <SelectItem value="preco-menor">Menor preço</SelectItem>
                <SelectItem value="preco-maior">Maior preço</SelectItem>
                <SelectItem value="reviews">Mais avaliações</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" className="h-12 border-border">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-border">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
                <div className="mt-8">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode Toggle */}
            <div className="hidden lg:flex items-center gap-1 bg-card border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'todos' || showVerifiedOnly || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== 'todos' && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory('todos')} 
                  />
                </Badge>
              )}
              {showVerifiedOnly && (
                <Badge variant="secondary" className="gap-1">
                  Verificados
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setShowVerifiedOnly(false)} 
                  />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  {`"${searchQuery}"`}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchQuery('')} 
                  />
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                <h3 className="font-semibold text-foreground mb-6">Filtros</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">
                {sortedServices.length} resultado{sortedServices.length !== 1 ? 's' : ''} encontrado{sortedServices.length !== 1 ? 's' : ''}
              </p>

              {/* Services Grid/List */}
              <div className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }>
                {sortedServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/servico/${service.id}`}
                    className={`group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-40 h-40 shrink-0' : 'aspect-[4/3]'
                    }`}>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                          {service.category}
                        </Badge>
                      </div>
                      {service.verified && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-primary text-primary-foreground rounded-full p-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{service.type}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {service.location}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">{service.priceLabel}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {sortedServices.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">Nenhum resultado encontrado</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('todos')
                      setShowVerifiedOnly(false)
                      setPriceRange([0, 10000])
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
