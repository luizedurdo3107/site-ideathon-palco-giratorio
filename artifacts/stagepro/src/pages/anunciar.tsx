import { useState } from 'react'
import { Link } from 'wouter'
import {
  Mic2, Music4, Camera, Zap, Layers, Users, Tent, Paintbrush,
  Video, ChevronRight, ChevronLeft, Upload, X, Check, Plus,
  MapPin, DollarSign, FileText, Image, Sparkles, ArrowRight,
  Star, Clock, Phone
} from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const TOTAL_STEPS = 4

const categories = [
  { id: 'musico', label: 'Músico / Cantor', icon: Mic2, description: 'Shows, serenatas, casamentos, eventos' },
  { id: 'banda', label: 'Banda', icon: Music4, description: 'Grupos musicais para qualquer evento' },
  { id: 'dj', label: 'DJ', icon: Zap, description: 'Festas, casamentos, eventos corporativos' },
  { id: 'fotografia', label: 'Foto & Vídeo', icon: Camera, description: 'Fotógrafos e videomakers profissionais' },
  { id: 'danca', label: 'Dança', icon: Users, description: 'Companhias e grupos de dança' },
  { id: 'teatro', label: 'Teatro & Circo', icon: Layers, description: 'Peças teatrais, performances, circo' },
  { id: 'espaco', label: 'Espaço', icon: Tent, description: 'Salões, casas de show, espaços culturais' },
  { id: 'equipamento', label: 'Equipamentos', icon: Sparkles, description: 'Som, iluminação, palco, estrutura' },
  { id: 'arte-visual', label: 'Arte Visual', icon: Paintbrush, description: 'Murais, ilustrações, exposições' },
  { id: 'producao', label: 'Produção', icon: Video, description: 'Produção e organização de eventos' },
]

const priceTypes = [
  { id: 'fixo', label: 'Valor fixo', description: 'Preço definido por apresentação' },
  { id: 'hora', label: 'Por hora', description: 'Cobrado por hora de serviço' },
  { id: 'consulta', label: 'Sob consulta', description: 'Orçamento personalizado' },
]

const suggestedTags: Record<string, string[]> = {
  musico: ['MPB', 'Sertanejo', 'Rock', 'Pop', 'Jazz', 'Bossa Nova', 'Gospel', 'Forró', 'Casamentos', 'Corporativo'],
  banda: ['Rock', 'Pop', 'Sertanejo', 'Cover', 'Instrumental', 'Festas', 'Casamentos', 'Corporativo'],
  dj: ['House', 'Eletrônica', 'Pop', 'Sertanejo', 'Funk', 'Festas', 'Casamentos', 'Open Air'],
  fotografia: ['Casamentos', 'Corporativo', 'Retrato', 'Editorial', 'Social', 'Clipe', 'Ensaio'],
  danca: ['Ballet', 'Contemporâneo', 'Samba', 'Forró', 'Shows', 'Corporativo'],
  teatro: ['Infantil', 'Adulto', 'Comédia', 'Drama', 'Improviso', 'Circo'],
  espaco: ['Shows', 'Casamentos', 'Corporativo', 'Festas', 'Teatro', 'Exposições'],
  equipamento: ['Som', 'Iluminação', 'LED', 'Palco', 'Tendas', 'Gerador'],
  'arte-visual': ['Grafite', 'Mural', 'Aquarela', 'Digital', 'Instalação', 'Exposição'],
  producao: ['Casamentos', 'Corporativo', 'Shows', 'Festivais', 'Formaturas'],
}

const demoPhotos = [
  'https://picsum.photos/seed/demo-service-1/400/300',
  'https://picsum.photos/seed/demo-service-2/400/300',
  'https://picsum.photos/seed/demo-service-3/400/300',
]

interface FormData {
  category: string
  serviceName: string
  description: string
  city: string
  state: string
  experience: string
  priceType: string
  price: string
  tags: string[]
  phone: string
  photos: string[]
}

const stateOptions = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

export default function AnunciarPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [form, setForm] = useState<FormData>({
    category: '',
    serviceName: '',
    description: '',
    city: '',
    state: '',
    experience: '',
    priceType: 'fixo',
    price: '',
    tags: [],
    phone: '',
    photos: [...demoPhotos],
  })

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const addTag = (tag: string) => {
    if (tag.trim() && !form.tags.includes(tag.trim()) && form.tags.length < 10) {
      update('tags', [...form.tags, tag.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => update('tags', form.tags.filter(t => t !== tag))

  const selectedCategory = categories.find(c => c.id === form.category)
  const tags = suggestedTags[form.category] ?? []

  const canProceed = () => {
    if (step === 1) return !!form.category
    if (step === 2) return !!form.serviceName && !!form.description && !!form.city && !!form.state
    if (step === 3) return form.priceType === 'consulta' || !!form.price
    return true
  }

  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Anúncio criado!</h1>
            <p className="text-muted-foreground mb-2">
              Seu serviço <strong className="text-foreground">"{form.serviceName}"</strong> foi enviado para revisão.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Nossa equipe avaliará seu perfil em até 24 horas. Você receberá uma confirmação assim que estiver ativo no marketplace.
            </p>
            <div className="bg-card border border-border rounded-2xl p-5 mb-8 text-left space-y-3">
              <p className="text-sm font-medium text-foreground mb-4">Resumo do anúncio</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground w-24 shrink-0">Categoria</span>
                <span className="text-foreground">{selectedCategory?.label}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground w-24 shrink-0">Nome</span>
                <span className="text-foreground">{form.serviceName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground w-24 shrink-0">Localização</span>
                <span className="text-foreground">{form.city}, {form.state}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground w-24 shrink-0">Preço</span>
                <span className="text-foreground">
                  {form.priceType === 'consulta' ? 'Sob consulta' : `R$ ${form.price}${form.priceType === 'hora' ? '/hora' : ''}`}
                </span>
              </div>
              {form.tags.length > 0 && (
                <div className="flex items-start gap-2 text-sm pt-1">
                  <span className="text-muted-foreground w-24 shrink-0 mt-0.5">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(t => <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11" onClick={() => { setSubmitted(false); setStep(1); setForm({ category: '', serviceName: '', description: '', city: '', state: '', experience: '', priceType: 'fixo', price: '', tags: [], phone: '', photos: [...demoPhotos] }) }}>
                <Plus className="w-4 h-4" /> Criar outro anúncio
              </Button>
              <Link href="/explorar">
                <Button variant="outline" className="w-full border-border h-11 gap-2">
                  Ver marketplace <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 lg:pt-24 pb-24 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">

          {/* Page header */}
          <div className="mb-10 pt-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Anunciar Serviço</h1>
            <p className="text-muted-foreground">Crie seu perfil e apareça para milhares de contratantes em todo o Brasil.</p>
          </div>

          {/* Step progress */}
          <div className="flex items-center gap-0 mb-10">
            {['Categoria', 'Detalhes', 'Preço e Tags', 'Fotos'].map((label, i) => {
              const n = i + 1
              const done = n < step
              const active = n === step
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      done ? 'bg-primary text-primary-foreground' :
                      active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {done ? <Check className="w-4 h-4" /> : n}
                    </div>
                    <span className={cn('text-sm font-medium hidden sm:block', active ? 'text-foreground' : 'text-muted-foreground')}>{label}</span>
                  </div>
                  {i < 3 && <div className={cn('flex-1 h-0.5 mx-3', done ? 'bg-primary' : 'bg-border')} />}
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">

              {/* Step 1 — Category */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Qual é o seu serviço?</h2>
                  <p className="text-muted-foreground text-sm mb-6">Escolha a categoria que melhor descreve o que você oferece.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {categories.map((cat) => {
                      const Icon = cat.icon
                      const selected = form.category === cat.id
                      return (
                        <button
                          key={cat.id}
                          onClick={() => update('category', cat.id)}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border text-left transition-all',
                            selected
                              ? 'border-primary bg-primary/8 ring-1 ring-primary/30'
                              : 'border-border bg-card hover:border-primary/40 hover:bg-card/80'
                          )}
                        >
                          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={cn('font-medium text-sm', selected ? 'text-primary' : 'text-foreground')}>{cat.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                          </div>
                          {selected && <Check className="w-4 h-4 text-primary ml-auto shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">Detalhes do serviço</h2>
                    <p className="text-muted-foreground text-sm">Descreva seu serviço com clareza para atrair mais contratantes.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceName" className="text-foreground font-medium">Nome do serviço / perfil <span className="text-destructive">*</span></Label>
                    <Input
                      id="serviceName"
                      placeholder="Ex: Maria Silva — Cantora MPB"
                      value={form.serviceName}
                      onChange={e => update('serviceName', e.target.value)}
                      className="h-11 bg-card border-border"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground text-right">{form.serviceName.length}/60</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground font-medium">Descrição <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="description"
                      placeholder="Conte sobre sua experiência, estilo, diferenciais e os tipos de evento que você atende..."
                      value={form.description}
                      onChange={e => update('description', e.target.value)}
                      className="min-h-32 bg-card border-border resize-none"
                      maxLength={800}
                    />
                    <p className="text-xs text-muted-foreground text-right">{form.description.length}/800</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-foreground font-medium">Cidade <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="city" placeholder="São Paulo" value={form.city} onChange={e => update('city', e.target.value)} className="pl-9 h-11 bg-card border-border" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">Estado <span className="text-destructive">*</span></Label>
                      <Select value={form.state} onValueChange={v => update('state', v)}>
                        <SelectTrigger className="h-11 bg-card border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>{stateOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-foreground font-medium">Anos de experiência</Label>
                      <Select value={form.experience} onValueChange={v => update('experience', v)}>
                        <SelectTrigger className="h-11 bg-card border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1">Menos de 1 ano</SelectItem>
                          <SelectItem value="1-3">1 a 3 anos</SelectItem>
                          <SelectItem value="3-5">3 a 5 anos</SelectItem>
                          <SelectItem value="5-10">5 a 10 anos</SelectItem>
                          <SelectItem value=">10">Mais de 10 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">WhatsApp</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="phone" placeholder="(11) 99999-9999" value={form.phone} onChange={e => update('phone', e.target.value)} className="pl-9 h-11 bg-card border-border" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Price & Tags */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">Preço e especialidades</h2>
                    <p className="text-muted-foreground text-sm">Defina sua faixa de preço e adicione tags para aparecer nas buscas certas.</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">Tipo de preço</Label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {priceTypes.map(pt => (
                        <button
                          key={pt.id}
                          onClick={() => update('priceType', pt.id)}
                          className={cn(
                            'p-4 rounded-xl border text-left transition-all',
                            form.priceType === pt.id
                              ? 'border-primary bg-primary/8 ring-1 ring-primary/30'
                              : 'border-border bg-card hover:border-primary/40'
                          )}
                        >
                          <p className={cn('font-medium text-sm mb-1', form.priceType === pt.id ? 'text-primary' : 'text-foreground')}>{pt.label}</p>
                          <p className="text-xs text-muted-foreground">{pt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.priceType !== 'consulta' && (
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-foreground font-medium">
                        Valor {form.priceType === 'hora' ? 'por hora (R$)' : 'por apresentação (R$)'} <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="1500"
                          value={form.price}
                          onChange={e => update('price', e.target.value)}
                          className="pl-9 h-11 bg-card border-border"
                          min="0"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Este valor aparecerá como "A partir de R$ {form.price || '—'}"</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">Tags de especialidade <span className="text-muted-foreground font-normal text-xs">(máx. 10)</span></Label>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => form.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                            className={cn(
                              'text-xs px-3 py-1.5 rounded-full border transition-all',
                              form.tags.includes(tag)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                            )}
                          >
                            {form.tags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Input
                        placeholder="Adicionar tag personalizada..."
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput) } }}
                        className="h-10 bg-card border-border text-sm"
                        maxLength={30}
                      />
                      <Button variant="outline" size="icon" className="h-10 w-10 border-border shrink-0" onClick={() => addTag(tagInput)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {form.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="gap-1.5 pr-1">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4 — Photos */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">Fotos e portfólio</h2>
                    <p className="text-muted-foreground text-sm">Adicione fotos do seu trabalho. Perfis com fotos recebem até 3x mais contatos.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {form.photos.map((photo, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-border">
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => update('photos', form.photos.filter((_, j) => j !== i))}
                            className="w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {i === 0 && <div className="absolute top-2 left-2"><Badge className="bg-primary text-primary-foreground text-xs">Capa</Badge></div>}
                      </div>
                    ))}

                    {form.photos.length < 8 && (
                      <button
                        onClick={() => {
                          const seed = Math.floor(Math.random() * 1000)
                          update('photos', [...form.photos, `https://picsum.photos/seed/upload-${seed}/400/300`])
                        }}
                        className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                          <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center px-2">Adicionar foto</p>
                      </button>
                    )}
                  </div>

                  <div className="bg-muted/40 border border-border/50 rounded-xl p-4 flex items-start gap-3">
                    <Image className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Dicas para boas fotos</p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-3">
                        <li>Use fotos em alta resolução, mínimo 800×600px</li>
                        <li>Escolha a melhor foto como imagem de capa</li>
                        <li>Mostre seu trabalho em ação, não só retratos</li>
                        <li>Adicione fotos de diferentes eventos para diversificar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => step > 1 ? setStep(s => s - 1) : undefined}
                  disabled={step === 1}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </Button>
                {step < TOTAL_STEPS ? (
                  <Button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11 px-6"
                  >
                    Próximo <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11 px-6"
                  >
                    Publicar anúncio <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Preview card */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pré-visualização</p>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {form.photos.length > 0
                      ? <img src={form.photos[0]} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Image className="w-10 h-10 text-muted-foreground/30" /></div>
                    }
                    {form.category && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm text-xs">
                          {selectedCategory?.label}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 truncate">
                      {form.serviceName || <span className="text-muted-foreground">Nome do serviço</span>}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {form.description || 'Sua descrição aparecerá aqui...'}
                    </p>
                    {form.city && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />{form.city}{form.state ? `, ${form.state}` : ''}
                      </div>
                    )}
                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {form.tags.slice(0, 3).map(t => <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>)}
                      </div>
                    )}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="text-xs font-medium">Novo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {form.priceType === 'consulta' ? 'Sob consulta' : form.price ? `A partir de R$ ${form.price}` : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/8 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">Dica Stage</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step === 1 && 'Escolha a categoria que melhor representa seu serviço para aparecer nas buscas certas.'}
                        {step === 2 && 'Perfis com descrições detalhadas (mínimo 100 palavras) recebem 2x mais mensagens.'}
                        {step === 3 && 'Adicione pelo menos 5 tags relevantes para aumentar sua visibilidade nas buscas.'}
                        {step === 4 && 'Perfis com fotos profissionais convertem até 3x mais visitantes em clientes.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
