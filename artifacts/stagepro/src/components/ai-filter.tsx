import { useState, useRef } from 'react'
import { Sparkles, Send, X, Loader2, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface Service {
  id: number
  name: string
  type: string
  category: string
  rating: number
  reviews: number
  location: string
  price: string
  priceLabel: string
  verified: boolean
  image: string
  tags: string[]
  priceValue?: number
}

interface AIFilterResult {
  matchedIds: number[]
  reasoning: string
  highlights: Record<number, string>
}

const suggestions = [
  'Músicos para casamento em São Paulo com boa avaliação',
  'DJ com menos de R$ 1.000 para festa de aniversário',
  'Fotógrafo profissional para evento corporativo',
  'Artista visual com experiência em murais',
  'Tudo relacionado a som e iluminação',
]

function mockAIFilter(prompt: string, services: Service[]): AIFilterResult {
  const lower = prompt.toLowerCase()

  const keywords: Record<string, string[]> = {
    musico: ['músico', 'musico', 'cantor', 'banda', 'mpb', 'jazz', 'música', 'musica'],
    dj: ['dj', 'disc jockey', 'house', 'techno', 'eletrônica', 'eletronica', 'festa'],
    foto: ['foto', 'fotógrafo', 'fotografo', 'imagem', 'vídeo', 'video', 'visual'],
    teatro: ['teatro', 'ator', 'performance', 'cena'],
    danca: ['danç', 'dança', 'ballet', 'coreografia'],
    som: ['som', 'áudio', 'audio', 'equipamento', 'speaker'],
    luz: ['luz', 'iluminação', 'iluminacao', 'lighthing'],
    casamento: ['casamento', 'noivado', 'núpcias', 'nupcias', 'festa'],
    corporativo: ['corporativo', 'empresa', 'evento', 'negócio', 'negocio'],
    sp: ['são paulo', 'sao paulo', 'sp'],
    rj: ['rio de janeiro', 'rj'],
    barato: ['barato', 'econômico', 'economico', 'baixo preço', 'menos de'],
    caro: ['premium', 'exclusivo', 'top', 'melhor'],
    avaliado: ['avaliação', 'avaliacao', 'nota alta', 'bem avaliado', 'boa avaliação', '5 estrela', 'melhor avaliação'],
    arte: ['arte', 'artista', 'visual', 'mural', 'grafite', 'criativo'],
  }

  const matched: number[] = []
  const highlights: Record<number, string> = {}

  const getScore = (service: Service): { score: number; reasons: string[] } => {
    let score = 0
    const reasons: string[] = []

    const allText = [service.name, service.type, service.category, ...service.tags].join(' ').toLowerCase()

    if (keywords.musico.some(k => lower.includes(k))) {
      if (['Músico', 'músico', 'Cantor'].some(c => service.category.includes(c) || service.type.toLowerCase().includes('cant') || service.type.toLowerCase().includes('mús'))) {
        score += 3; reasons.push('artista musical')
      }
    }
    if (keywords.dj.some(k => lower.includes(k))) {
      if (service.category === 'DJ' || service.tags.some(t => ['House', 'Techno', 'Pop'].includes(t))) {
        score += 3; reasons.push('DJ e produção musical')
      }
    }
    if (keywords.foto.some(k => lower.includes(k))) {
      if (service.category === 'Fotografia' || service.type.toLowerCase().includes('foto') || service.type.toLowerCase().includes('vídeo')) {
        score += 3; reasons.push('fotografia e vídeo')
      }
    }
    if (keywords.teatro.some(k => lower.includes(k))) {
      if (service.category === 'Teatro') { score += 3; reasons.push('teatro e performance') }
    }
    if (keywords.danca.some(k => lower.includes(k))) {
      if (service.category === 'Dança') { score += 3; reasons.push('dança e coreografia') }
    }
    if (keywords.som.some(k => lower.includes(k))) {
      if (service.tags.some(t => ['Som', 'Iluminação', 'Palco'].includes(t))) { score += 3; reasons.push('equipamentos de som') }
    }
    if (keywords.luz.some(k => lower.includes(k))) {
      if (service.tags.some(t => ['Iluminação', 'Som', 'Palco'].includes(t))) { score += 2; reasons.push('iluminação') }
    }
    if (keywords.casamento.some(k => lower.includes(k))) {
      if (service.tags.some(t => ['Casamentos', 'MPB', 'Jazz', 'Bossa Nova', 'Ballet'].includes(t))) { score += 2; reasons.push('experiência em casamentos') }
    }
    if (keywords.corporativo.some(k => lower.includes(k))) {
      if (service.tags.some(t => t.toLowerCase().includes('corporativo'))) { score += 2; reasons.push('eventos corporativos') }
    }
    if (keywords.sp.some(k => lower.includes(k))) {
      if (service.location.includes('SP')) { score += 1; reasons.push('São Paulo') }
    }
    if (keywords.rj.some(k => lower.includes(k))) {
      if (service.location.includes('RJ')) { score += 1; reasons.push('Rio de Janeiro') }
    }
    if (keywords.avaliado.some(k => lower.includes(k))) {
      if (service.rating >= 4.8) { score += 2; reasons.push(`avaliação ${service.rating}⭐`) }
    }
    if (keywords.arte.some(k => lower.includes(k))) {
      if (service.category === 'Artista Visual' || service.type.toLowerCase().includes('arte')) { score += 3; reasons.push('arte visual') }
    }

    const words = lower.split(/\s+/).filter(w => w.length > 3)
    for (const word of words) {
      if (allText.includes(word)) { score += 1 }
    }

    return { score, reasons }
  }

  const scored = services.map(s => ({ service: s, ...getScore(s) })).sort((a, b) => b.score - a.score)
  const maxScore = scored[0]?.score ?? 0

  if (maxScore === 0) {
    for (const { service } of scored.slice(0, 3)) {
      matched.push(service.id)
      highlights[service.id] = 'Resultado genérico baseado na sua busca'
    }
  } else {
    for (const { service, score, reasons } of scored) {
      if (score > 0 && (score >= maxScore * 0.4 || matched.length < 2)) {
        matched.push(service.id)
        highlights[service.id] = reasons.length > 0
          ? `Corresponde porque: ${reasons.join(', ')}`
          : 'Parcialmente relacionado à busca'
        if (matched.length >= 6) break
      }
    }
  }

  const reasoningParts: string[] = []
  if (keywords.casamento.some(k => lower.includes(k))) reasoningParts.push('evento de casamento')
  if (keywords.corporativo.some(k => lower.includes(k))) reasoningParts.push('evento corporativo')
  if (keywords.sp.some(k => lower.includes(k))) reasoningParts.push('localização em São Paulo')
  if (keywords.avaliado.some(k => lower.includes(k))) reasoningParts.push('alta avaliação')
  if (keywords.dj.some(k => lower.includes(k))) reasoningParts.push('serviço de DJ')
  if (keywords.musico.some(k => lower.includes(k))) reasoningParts.push('músicos e cantores')
  if (keywords.foto.some(k => lower.includes(k))) reasoningParts.push('fotografia e audiovisual')

  const reasoning = reasoningParts.length > 0
    ? `Analisei sua busca e identifiquei preferências por: ${reasoningParts.join(', ')}. Encontrei ${matched.length} serviço${matched.length !== 1 ? 's' : ''} que melhor correspondem ao que você procura.`
    : `Busquei em todos os serviços disponíveis e selecionei os ${matched.length} mais relevantes para sua descrição.`

  return { matchedIds: matched, reasoning, highlights }
}

interface AIFilterProps {
  services: Service[]
  onFilter: (result: AIFilterResult | null) => void
  isFiltering: boolean
  setIsFiltering: (v: boolean) => void
}

export function AIFilter({ services, onFilter, isFiltering, setIsFiltering }: AIFilterProps) {
  const [prompt, setPrompt] = useState('')
  const [activePrompt, setActivePrompt] = useState('')
  const [reasoning, setReasoning] = useState('')
  const [showReasoning, setShowReasoning] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    if (!prompt.trim() || isFiltering) return
    const currentPrompt = prompt.trim()
    setIsFiltering(true)
    setActivePrompt(currentPrompt)
    setIsActive(true)

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600))

    const result = mockAIFilter(currentPrompt, services)
    setReasoning(result.reasoning)
    setShowReasoning(true)
    onFilter(result)
    setIsFiltering(false)
  }

  const handleClear = () => {
    setPrompt('')
    setActivePrompt('')
    setReasoning('')
    setIsActive(false)
    onFilter(null)
    setIsFiltering(false)
  }

  const handleSuggestion = (s: string) => {
    setPrompt(s)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  return (
    <div className="relative mb-8">
      <div className={cn(
        'relative rounded-2xl border transition-all duration-300',
        isActive
          ? 'bg-gradient-to-br from-primary/8 via-card to-card border-primary/40 shadow-lg shadow-primary/10'
          : 'bg-card border-border hover:border-primary/30'
      )}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {isActive && <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />}
        </div>

        <div className="relative p-5 lg:p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              'mt-1 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
              isActive ? 'bg-primary shadow-md shadow-primary/30' : 'bg-muted'
            )}>
              <Sparkles className={cn('w-4 h-4 transition-colors', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-foreground">Busca com Inteligência Artificial</span>
                <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-amber-500/50 text-amber-500 bg-amber-500/10 font-medium">DEMO</Badge>
              </div>

              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Descreva o que você precisa... Ex: &quot;Quero um músico de MPB para casamento em São Paulo com avaliação acima de 4.8&quot;"
                className="min-h-[64px] max-h-40 resize-none bg-transparent border-0 p-0 focus-visible:ring-0 text-sm placeholder:text-muted-foreground/60 shadow-none"
                disabled={isFiltering}
              />

              {!isActive && !isFiltering && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.slice(0, 3).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(s)}
                      className="inline-flex items-center gap-1.5 text-xs bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/30 text-muted-foreground rounded-lg px-3 py-1.5 transition-all"
                    >
                      <Lightbulb className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[180px]">{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 mt-1">
              {isActive && (
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                size="icon"
                className={cn(
                  'h-9 w-9 transition-all',
                  isFiltering
                    ? 'bg-primary/50 cursor-not-allowed'
                    : prompt.trim()
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/30 hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
                onClick={handleSubmit}
                disabled={!prompt.trim() || isFiltering}
              >
                {isFiltering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {isFiltering && (
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground pl-13">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Analisando sua busca...</span>
            </div>
          )}

          {reasoning && isActive && !isFiltering && (
            <div className="mt-4 pl-13">
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                <button
                  className="flex items-center gap-2 w-full text-left"
                  onClick={() => setShowReasoning(!showReasoning)}
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-xs font-medium text-primary flex-1">Raciocínio da IA</span>
                  {showReasoning ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />}
                </button>
                {showReasoning && (
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{reasoning}</p>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Busca:</span>
                  <Badge variant="secondary" className="text-xs gap-1 max-w-[300px] truncate">
                    <Sparkles className="w-3 h-3 text-primary shrink-0" />
                    {activePrompt}
                  </Badge>
                </div>
                <button onClick={handleClear} className="text-xs text-muted-foreground hover:text-primary transition-colors">Limpar filtro</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
