import { useState, useEffect } from 'react'
import { Link, useSearch } from 'wouter'
import {
  Search, SlidersHorizontal, MapPin, Star, CheckCircle,
  Grid3X3, List, X, Sparkles, Mic2, Zap, Camera, Users,
  Layers, Tent, Volume2, Paintbrush, Music4
} from 'lucide-react'
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
import { AIFilter, type Service } from '@/components/ai-filter'
import { cn } from '@/lib/utils'

// Each category maps to the exact `category` field values used in the services array
const categories = [
  { value: 'todos',       label: 'Todos',           icon: Music4,    serviceCategories: [] as string[] },
  { value: 'musico',      label: 'Músicos',          icon: Mic2,      serviceCategories: ['Músico'] },
  { value: 'dj',          label: 'DJs',              icon: Zap,       serviceCategories: ['DJ'] },
  { value: 'fotografia',  label: 'Foto & Vídeo',     icon: Camera,    serviceCategories: ['Fotografia'] },
  { value: 'danca',       label: 'Dança',            icon: Users,     serviceCategories: ['Dança'] },
  { value: 'teatro',      label: 'Teatro & Circo',   icon: Layers,    serviceCategories: ['Teatro'] },
  { value: 'espaco',      label: 'Espaços',          icon: Tent,      serviceCategories: ['Espaço'] },
  { value: 'equipamento', label: 'Equipamentos',     icon: Volume2,   serviceCategories: ['Equipamento'] },
  { value: 'arte',        label: 'Arte Visual',      icon: Paintbrush,serviceCategories: ['Artista Visual'] },
]

const services: Service[] = [
  {
    id: 1,
    name: 'Maria Silva',
    type: 'Cantora & Compositora',
    category: 'Músico',
    rating: 4.9, reviews: 127,
    location: 'São Paulo, SP',
    priceValue: 1500,
    price: 'A partir de R$ 1.500', priceLabel: 'A partir de R$ 1.500',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=47',
    tags: ['MPB', 'Jazz', 'Bossa Nova'],
  },
  {
    id: 2,
    name: 'Som & Luz Eventos',
    type: 'Equipamentos Profissionais',
    category: 'Equipamento',
    rating: 4.8, reviews: 89,
    location: 'Rio de Janeiro, RJ',
    priceValue: 3000,
    price: 'A partir de R$ 3.000', priceLabel: 'A partir de R$ 3.000',
    verified: true,
    image: 'https://picsum.photos/seed/sound-events/600/400',
    tags: ['Som', 'Iluminação', 'Palco'],
  },
  {
    id: 3,
    name: 'Companhia de Teatro Aurora',
    type: 'Teatro & Performance',
    category: 'Teatro',
    rating: 5.0, reviews: 56,
    location: 'Belo Horizonte, MG',
    priceValue: 5000,
    price: 'Sob consulta', priceLabel: 'Sob consulta',
    verified: true,
    image: 'https://picsum.photos/seed/theater-aurora/600/400',
    tags: ['Teatro', 'Performance', 'Eventos Corporativos'],
  },
  {
    id: 4,
    name: 'DJ Anderson',
    type: 'DJ & Produtor Musical',
    category: 'DJ',
    rating: 4.7, reviews: 203,
    location: 'Curitiba, PR',
    priceValue: 800,
    price: 'A partir de R$ 800', priceLabel: 'A partir de R$ 800',
    verified: true,
    image: 'https://picsum.photos/seed/dj-anderson/600/400',
    tags: ['House', 'Techno', 'Pop'],
  },
  {
    id: 5,
    name: 'Studio Arte Visual',
    type: 'Fotografia & Vídeo',
    category: 'Fotografia',
    rating: 4.9, reviews: 178,
    location: 'Salvador, BA',
    priceValue: 2000,
    price: 'A partir de R$ 2.000', priceLabel: 'A partir de R$ 2.000',
    verified: true,
    image: 'https://picsum.photos/seed/photo-studio/600/400',
    tags: ['Fotografia', 'Vídeo', 'Edição'],
  },
  {
    id: 6,
    name: 'Ballet Contemporâneo SP',
    type: 'Dança & Coreografia',
    category: 'Dança',
    rating: 4.8, reviews: 67,
    location: 'São Paulo, SP',
    priceValue: 4000,
    price: 'Sob consulta', priceLabel: 'Sob consulta',
    verified: true,
    image: 'https://picsum.photos/seed/ballet-sp/600/400',
    tags: ['Ballet', 'Contemporâneo', 'Shows'],
  },
  {
    id: 7,
    name: 'Banda Rock Revolution',
    type: 'Banda de Rock',
    category: 'Músico',
    rating: 4.6, reviews: 145,
    location: 'Porto Alegre, RS',
    priceValue: 2500,
    price: 'A partir de R$ 2.500', priceLabel: 'A partir de R$ 2.500',
    verified: true,
    image: 'https://picsum.photos/seed/rock-band/600/400',
    tags: ['Rock', 'Pop Rock', 'Covers'],
  },
  {
    id: 8,
    name: 'Espaço Cultural Jardins',
    type: 'Espaço para Eventos',
    category: 'Espaço',
    rating: 4.9, reviews: 234,
    location: 'São Paulo, SP',
    priceValue: 8000,
    price: 'A partir de R$ 8.000', priceLabel: 'A partir de R$ 8.000',
    verified: true,
    image: 'https://picsum.photos/seed/venue-jardins/600/400',
    tags: ['Shows', 'Teatro', 'Exposições'],
  },
  {
    id: 9,
    name: 'Paulo Arte Urbana',
    type: 'Arte Urbana & Murais',
    category: 'Artista Visual',
    rating: 5.0, reviews: 45,
    location: 'Recife, PE',
    priceValue: 1200,
    price: 'A partir de R$ 1.200', priceLabel: 'A partir de R$ 1.200',
    verified: true,
    image: 'https://picsum.photos/seed/urban-art/600/400',
    tags: ['Grafite', 'Murais', 'Arte Urbana'],
  },
  {
    id: 10,
    name: 'Rodrigo Vasconcelos',
    type: 'Cantor Sertanejo',
    category: 'Músico',
    rating: 4.8, reviews: 312,
    location: 'Goiânia, GO',
    priceValue: 3500,
    price: 'A partir de R$ 3.500', priceLabel: 'A partir de R$ 3.500',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=52',
    tags: ['Sertanejo', 'Universitário', 'Festas'],
  },
  {
    id: 11,
    name: 'DJ Fernanda Beats',
    type: 'DJ & Produtora',
    category: 'DJ',
    rating: 4.9, reviews: 88,
    location: 'São Paulo, SP',
    priceValue: 1200,
    price: 'A partir de R$ 1.200', priceLabel: 'A partir de R$ 1.200',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=25',
    tags: ['Eletrônica', 'Deep House', 'Festas'],
  },
  {
    id: 12,
    name: 'Circo das Artes',
    type: 'Acrobacia & Circo',
    category: 'Teatro',
    rating: 4.9, reviews: 73,
    location: 'Florianópolis, SC',
    priceValue: 6000,
    price: 'A partir de R$ 6.000', priceLabel: 'A partir de R$ 6.000',
    verified: true,
    image: 'https://picsum.photos/seed/circus-arts/600/400',
    tags: ['Circo', 'Acrobacia', 'Shows'],
  },
  {
    id: 13,
    name: 'Felipe Acoustic',
    type: 'Violonista & Cantor',
    category: 'Músico',
    rating: 4.7, reviews: 196,
    location: 'Brasília, DF',
    priceValue: 900,
    price: 'A partir de R$ 900', priceLabel: 'A partir de R$ 900',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=65',
    tags: ['Acústico', 'Pop', 'Casamentos'],
  },
  {
    id: 14,
    name: 'LensArt Cinema',
    type: 'Videomaker Profissional',
    category: 'Fotografia',
    rating: 5.0, reviews: 41,
    location: 'Rio de Janeiro, RJ',
    priceValue: 4500,
    price: 'A partir de R$ 4.500', priceLabel: 'A partir de R$ 4.500',
    verified: true,
    image: 'https://picsum.photos/seed/lens-cinema/600/400',
    tags: ['Vídeo', 'Casamento', 'Corporativo'],
  },
  {
    id: 15,
    name: 'Banda Forró Raiz',
    type: 'Forró & Música Nordestina',
    category: 'Músico',
    rating: 4.8, reviews: 224,
    location: 'Fortaleza, CE',
    priceValue: 2200,
    price: 'A partir de R$ 2.200', priceLabel: 'A partir de R$ 2.200',
    verified: true,
    image: 'https://picsum.photos/seed/forro-band/600/400',
    tags: ['Forró', 'Nordestina', 'Festas'],
  },
  {
    id: 16,
    name: 'ProLight Iluminação',
    type: 'Iluminação Cênica Profissional',
    category: 'Equipamento',
    rating: 4.7, reviews: 119,
    location: 'São Paulo, SP',
    priceValue: 2800,
    price: 'A partir de R$ 2.800', priceLabel: 'A partir de R$ 2.800',
    verified: true,
    image: 'https://picsum.photos/seed/prolight/600/400',
    tags: ['Iluminação', 'LED', 'Shows'],
  },
  {
    id: 17,
    name: 'Ana Claudia Soprano',
    type: 'Soprano Lírica',
    category: 'Músico',
    rating: 5.0, reviews: 38,
    location: 'São Paulo, SP',
    priceValue: 2000,
    price: 'A partir de R$ 2.000', priceLabel: 'A partir de R$ 2.000',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=31',
    tags: ['Lírica', 'Ópera', 'Casamentos'],
  },
  {
    id: 18,
    name: 'Palco & Estrutura RJ',
    type: 'Montagem de Palco',
    category: 'Equipamento',
    rating: 4.6, reviews: 157,
    location: 'Rio de Janeiro, RJ',
    priceValue: 5500,
    price: 'A partir de R$ 5.500', priceLabel: 'A partir de R$ 5.500',
    verified: true,
    image: 'https://picsum.photos/seed/stage-rj/600/400',
    tags: ['Palco', 'Estrutura', 'Tendas'],
  },
  {
    id: 19,
    name: 'Studio Dança Contemporânea',
    type: 'Dança Moderna',
    category: 'Dança',
    rating: 4.8, reviews: 82,
    location: 'Curitiba, PR',
    priceValue: 3200,
    price: 'A partir de R$ 3.200', priceLabel: 'A partir de R$ 3.200',
    verified: true,
    image: 'https://picsum.photos/seed/dance-studio/600/400',
    tags: ['Contemporâneo', 'Moderno', 'Shows'],
  },
  {
    id: 20,
    name: 'Vitória Santos',
    type: 'Cantora Pop & R&B',
    category: 'Músico',
    rating: 4.9, reviews: 167,
    location: 'São Paulo, SP',
    priceValue: 1800,
    price: 'A partir de R$ 1.800', priceLabel: 'A partir de R$ 1.800',
    verified: true,
    image: 'https://i.pravatar.cc/600?img=36',
    tags: ['Pop', 'R&B', 'Soul'],
  },
  {
    id: 21,
    name: 'Espaço Vila Nova',
    type: 'Casa de Shows',
    category: 'Espaço',
    rating: 4.7, reviews: 298,
    location: 'Belo Horizonte, MG',
    priceValue: 6500,
    price: 'A partir de R$ 6.500', priceLabel: 'A partir de R$ 6.500',
    verified: true,
    image: 'https://picsum.photos/seed/venue-nova/600/400',
    tags: ['Shows', 'Festas', 'Capacidade 300'],
  },
]

function countForCategory(cat: typeof categories[0]) {
  if (cat.value === 'todos') return services.length
  return services.filter(s => cat.serviceCategories.includes(s.category)).length
}

export default function ExplorarPage() {
  const search = useSearch()
  const initialCategory = new URLSearchParams(search).get('categoria') ?? 'todos'
  const [searchQuery, setSearchQuery]     = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    categories.some(c => c.value === initialCategory) ? initialCategory : 'todos'
  )
  const [viewMode, setViewMode]           = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange]       = useState([0, 10000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [sortBy, setSortBy]               = useState('relevancia')
  const [isFilterOpen, setIsFilterOpen]   = useState(false)
  const [aiFilterResult, setAiFilterResult] = useState<{
    matchedIds: number[]
    highlights: Record<number, string>
  } | null>(null)
  const [isAiFiltering, setIsAiFiltering] = useState(false)

  const activeCat = categories.find(c => c.value === selectedCategory)!

  const matchesCategory = (service: Service) => {
    if (selectedCategory === 'todos') return true
    return activeCat.serviceCategories.includes(service.category)
  }

  const filteredServices = services.filter((service) => {
    if (aiFilterResult) return aiFilterResult.matchedIds.includes(service.id)
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPrice =
      (service.priceValue ?? 0) >= priceRange[0] && (service.priceValue ?? 0) <= priceRange[1]
    const matchesVerified = !showVerifiedOnly || service.verified
    return matchesSearch && matchesCategory(service) && matchesPrice && matchesVerified
  })

  const sortedServices = aiFilterResult
    ? [...filteredServices].sort(
        (a, b) => aiFilterResult.matchedIds.indexOf(a.id) - aiFilterResult.matchedIds.indexOf(b.id)
      )
    : [...filteredServices].sort((a, b) => {
        switch (sortBy) {
          case 'preco-menor': return (a.priceValue ?? 0) - (b.priceValue ?? 0)
          case 'preco-maior': return (b.priceValue ?? 0) - (a.priceValue ?? 0)
          case 'avaliacao':   return b.rating - a.rating
          case 'reviews':     return b.reviews - a.reviews
          default:            return 0
        }
      })

  const clearAll = () => {
    setSelectedCategory('todos')
    setSearchQuery('')
    setShowVerifiedOnly(false)
    setPriceRange([0, 10000])
    setAiFilterResult(null)
  }

  const hasActiveFilters = selectedCategory !== 'todos' || showVerifiedOnly || !!searchQuery

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Price range */}
      <div>
        <Label className="text-foreground font-medium mb-4 block">Faixa de Preço</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={10000}
          step={100}
          className="mb-3"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="bg-muted px-2 py-0.5 rounded text-xs">R$ {priceRange[0].toLocaleString('pt-BR')}</span>
          <span className="bg-muted px-2 py-0.5 rounded text-xs">R$ {priceRange[1].toLocaleString('pt-BR')}</span>
        </div>
      </div>

      {/* Verified */}
      <div className="flex items-center gap-2 py-1">
        <Checkbox
          id="verified"
          checked={showVerifiedOnly}
          onCheckedChange={(v) => setShowVerifiedOnly(v as boolean)}
        />
        <Label htmlFor="verified" className="text-sm text-foreground cursor-pointer">
          Apenas verificados <CheckCircle className="w-3.5 h-3.5 text-primary inline ml-1" />
        </Label>
      </div>

      {/* Category radio list */}
      <div>
        <Label className="text-foreground font-medium mb-3 block">Categoria</Label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon
            const count = countForCategory(cat)
            const active = selectedCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                  active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{cat.label}</span>
                <span className={cn('text-xs tabular-nums', active ? 'text-primary' : 'text-muted-foreground/60')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground gap-1.5" onClick={clearAll}>
          <X className="w-3.5 h-3.5" /> Limpar filtros
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24 pb-24 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Explorar Marketplace</h1>
            <p className="text-muted-foreground">Encontre artistas, equipamentos e serviços para seu evento</p>
          </div>

          {/* AI Filter */}
          <AIFilter
            services={services}
            onFilter={(result) => setAiFilterResult(result)}
            isFiltering={isAiFiltering}
            setIsFiltering={setIsAiFiltering}
          />

          {/* Category pill tabs — always visible (unless AI filter active) */}
          {!aiFilterResult && !isAiFiltering && (
            <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-none">
              <div className="flex gap-2 w-max">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const active = selectedCategory === cat.value
                  const count = countForCategory(cat)
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap shrink-0',
                        active
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                          : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                      <span className={cn(
                        'text-xs px-1.5 py-0.5 rounded-full tabular-nums',
                        active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Search + sort bar */}
          {!aiFilterResult && !isAiFiltering && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nome, estilo, cidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11 bg-card border-border"
                />
                {searchQuery && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setSearchQuery('')}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 h-11 bg-card border-border">
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

              {/* Mobile filter sheet */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" className={cn('h-11 border-border gap-2', hasActiveFilters && 'border-primary text-primary')}>
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                    {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background border-border overflow-y-auto">
                  <SheetHeader><SheetTitle>Filtros</SheetTitle></SheetHeader>
                  <div className="mt-6"><SidebarContent /></div>
                  <div className="mt-8">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsFilterOpen(false)}>
                      Ver {filteredServices.length} resultado{filteredServices.length !== 1 ? 's' : ''}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-card border border-border rounded-lg p-1 shrink-0">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className={cn('h-9 w-9', viewMode === 'grid' && 'bg-primary text-primary-foreground')}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className={cn('h-9 w-9', viewMode === 'list' && 'bg-primary text-primary-foreground')}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {!aiFilterResult && hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory !== 'todos' && (
                <Badge variant="secondary" className="gap-1.5 pr-1.5">
                  {activeCat.label}
                  <button onClick={() => setSelectedCategory('todos')} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {showVerifiedOnly && (
                <Badge variant="secondary" className="gap-1.5 pr-1.5">
                  Verificados
                  <button onClick={() => setShowVerifiedOnly(false)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1.5 pr-1.5">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
                Limpar tudo
              </button>
            </div>
          )}

          {/* Main layout: sidebar + grid */}
          <div className="flex gap-8">

            {/* Desktop sidebar */}
            {!aiFilterResult && (
              <aside className="hidden lg:block w-60 shrink-0">
                <div className="bg-card border border-border rounded-xl p-5 sticky top-28">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-foreground">Filtros</h3>
                    {hasActiveFilters && (
                      <button onClick={clearAll} className="text-xs text-primary hover:text-primary/80">
                        Limpar
                      </button>
                    )}
                  </div>
                  <SidebarContent />
                </div>
              </aside>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Result count + view toggle for AI mode */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {isAiFiltering ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block" />
                      Analisando com IA...
                    </span>
                  ) : (
                    <>
                      <span className="font-medium text-foreground">{sortedServices.length}</span>
                      {' '}resultado{sortedServices.length !== 1 ? 's' : ''}
                      {selectedCategory !== 'todos' && !aiFilterResult && (
                        <span className="text-muted-foreground"> em <span className="text-foreground">{activeCat.label}</span></span>
                      )}
                      {aiFilterResult && (
                        <span className="ml-2 inline-flex items-center gap-1 text-primary">
                          <Sparkles className="w-3 h-3" /> filtrado por IA
                        </span>
                      )}
                    </>
                  )}
                </p>
                {aiFilterResult && (
                  <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
                    <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" className={cn('h-8 w-8', viewMode === 'grid' && 'bg-primary text-primary-foreground')} onClick={() => setViewMode('grid')}><Grid3X3 className="w-3.5 h-3.5" /></Button>
                    <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" className={cn('h-8 w-8', viewMode === 'list' && 'bg-primary text-primary-foreground')} onClick={() => setViewMode('list')}><List className="w-3.5 h-3.5" /></Button>
                  </div>
                )}
              </div>

              {/* Cards */}
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
                {sortedServices.map((service, index) => {
                  const highlight = aiFilterResult?.highlights[service.id]
                  return (
                    <Link
                      key={service.id}
                      href={`/servico/${service.id}`}
                      className={cn(
                        'group bg-card border rounded-2xl overflow-hidden transition-all duration-300',
                        viewMode === 'list' ? 'flex' : '',
                        aiFilterResult
                          ? 'border-primary/30 hover:border-primary/60 shadow-sm shadow-primary/5'
                          : 'border-border hover:border-primary/50 hover:shadow-md hover:shadow-background/50',
                        aiFilterResult && index === 0 ? 'ring-1 ring-primary/30' : ''
                      )}
                    >
                      <div className={cn('relative overflow-hidden bg-muted', viewMode === 'list' ? 'w-36 shrink-0' : 'aspect-[4/3]')}>
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-background/90 text-foreground backdrop-blur-sm text-xs">{service.category}</Badge>
                        </div>
                        {service.verified && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}
                        {aiFilterResult && index === 0 && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-primary text-primary-foreground gap-1 text-xs">
                              <Sparkles className="w-3 h-3" />Melhor match
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className={cn('p-4', viewMode === 'list' ? 'flex-1' : '')}>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{service.name}</h3>
                            <p className="text-xs text-muted-foreground truncate">{service.type}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1 shrink-0">
                            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <MapPin className="w-3 h-3" />{service.location}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>

                        {highlight && (
                          <div className="mb-3 flex items-start gap-1.5 text-xs text-primary bg-primary/8 border border-primary/15 rounded-lg px-3 py-2">
                            <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        )}

                        <div className="pt-3 border-t border-border">
                          <p className="text-sm text-muted-foreground">{service.priceLabel}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Empty state */}
              {sortedServices.length === 0 && !isAiFiltering && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7 text-muted-foreground/50" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Nenhum resultado encontrado</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Não encontramos serviços{selectedCategory !== 'todos' ? ` em "${activeCat.label}"` : ''}{searchQuery ? ` para "${searchQuery}"` : ''}.
                  </p>
                  <Button variant="outline" onClick={clearAll} className="border-border">
                    Limpar filtros e ver todos
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
