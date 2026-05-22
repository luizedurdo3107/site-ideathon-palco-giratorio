import { Link } from 'wouter'
import { Heart, Globe, Rocket, Shield, Zap, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const stats = [
  { value: '2.500+', label: 'Artistas cadastrados' },
  { value: '15.000+', label: 'Eventos realizados' },
  { value: '500+', label: 'Cidades atendidas' },
  { value: '98%', label: 'Satisfação dos clientes' },
]

const values = [
  {
    icon: Heart,
    title: 'Paixão pela Arte',
    description: 'Acreditamos que a arte transforma vidas. Nossa plataforma nasceu do amor genuíno pela cultura e pelo entretenimento brasileiro.',
  },
  {
    icon: Shield,
    title: 'Confiança e Segurança',
    description: 'Todos os profissionais passam por verificação. Suas contratações são protegidas por nossa garantia de satisfação.',
  },
  {
    icon: Zap,
    title: 'Simplicidade',
    description: 'Conectar artistas a quem precisa de talento deve ser simples. Eliminamos a burocracia para que você foque no que importa.',
  },
  {
    icon: Globe,
    title: 'Brasil Inteiro',
    description: 'Do Oiapoque ao Chuí, conectamos talentos de todo o Brasil a eventos em qualquer canto do país.',
  },
]


const milestones = [
  { year: '2021', event: 'Stage é fundada em São Paulo com 15 artistas cadastrados' },
  { year: '2022', event: 'Expansão para Rio de Janeiro e Minas Gerais. Primeiro milhão em transações.' },
  { year: '2023', event: 'Lançamento da busca por IA e expansão para todo o Brasil' },
  { year: '2024', event: 'Mais de 2.500 artistas e 15.000 eventos realizados na plataforma' },
]

const testimonials = [
  {
    text: '"A Stage revolucionou como faço eventos. Em minutos encontro qualquer tipo de talento que preciso — de músicos a fotógrafos profissionais."',
    author: 'Patricia Lima',
    role: 'Produtora de Eventos, São Paulo',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?img=32',
  },
  {
    text: '"Desde que entrei na plataforma, minha agenda está sempre cheia. Consigo novos clientes toda semana sem precisar me preocupar com divulgação."',
    author: 'Gabriel Santos',
    role: 'DJ e Produtor Musical, Rio de Janeiro',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?img=68',
  },
  {
    text: '"A confiança que a plataforma transmite é diferente de qualquer outra. Contratei um fotógrafo para meu casamento e foi perfeito."',
    author: 'Ana & Carlos',
    role: 'Noivos, Belo Horizonte',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?img=26',
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">

        {/* Hero */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-6 px-4 py-1.5">Nossa História</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
                Conectando Talentos ao{' '}
                <span className="text-primary">Brasil Inteiro</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                A Stage é uma plataforma criada para facilitar a contratação de serviços relacionados à arte, cultura e muito mais. Mais do que um sistema, uma rede de divulgação para os adeptos à cultura. Quem monta somos nós, mas o palco é seu!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/explorar">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">
                    Explorar Plataforma <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/cadastrar">
                  <Button variant="outline" size="lg" className="border-border h-12 px-8">Cadastrar Gratuitamente</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">Nossa Missão</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
                  Por que a Stage existe?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A Stage é uma plataforma criada para facilitar a contratação de serviços relacionados à arte, cultura e muito mais. O sistema ajuda na divulgação de artistas e empresas prestadoras de serviços para que ganhem visibilidade e ajudem a rodar o mercado da arte no geral.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Mais do que um sistema, uma rede de divulgação para os adeptos à cultura. Quem monta somos nós, mas o palco é seu!
                </p>
                <div className="space-y-3">
                  {['Perfis verificados com portfólio real', 'Avaliações honestas de contratantes', 'Chat direto sem intermediários', 'Pagamento seguro e garantido'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/stagepro-mission/600/600"
                    alt="Artistas no palco"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex -space-x-2">
                      {[11,12,13,14].map(n => <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} className="w-8 h-8 rounded-full border-2 border-card" alt="" />)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">+2.500 artistas</p>
                      <p className="text-xs text-muted-foreground">aguardando você</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-primary fill-primary" />)}
                    <span className="text-sm text-muted-foreground ml-1">4.9 média</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gradient-to-b from-muted/30 to-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">Valores</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">O que nos guia todo dia</h2>
              <p className="text-muted-foreground text-lg">Nossos valores não são palavras na parede. Eles guiam cada decisão de produto e cada interação com a comunidade.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">Depoimentos</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">O que dizem sobre nós</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" />)}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 italic">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Faça parte dessa história</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">Seja como artista ou contratante, a Stage é o seu espaço. Cadastre-se gratuitamente e comece hoje.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastrar">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">Criar conta grátis <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Link href="/explorar">
                <Button variant="outline" size="lg" className="border-border h-12 px-8">Ver o marketplace</Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
