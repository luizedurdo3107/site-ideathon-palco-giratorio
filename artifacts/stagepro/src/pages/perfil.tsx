import { Link, useLocation } from 'wouter'
import { MapPin, Star, Calendar, Settings, LogOut, ChevronRight, Mic2, MessageCircle, Heart, Shield, Bell, HelpCircle, Lock, User } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/use-auth'
import { clearAuthUser } from '@/lib/auth'

function NotLoggedIn() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Acesse sua conta</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Entre na sua conta para gerenciar seu perfil, serviços e mensagens na plataforma.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/entrar">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastrar">
              <Button variant="outline" className="w-full h-12 border-border text-base font-medium">
                Criar uma conta
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Mic2, label: '2.500+ artistas' },
              { icon: Star, label: '98% satisfação' },
              { icon: Shield, label: 'Perfis verificados' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-4">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}

export default function PerfilPage() {
  const { user, isLoggedIn } = useAuth()
  const [, navigate] = useLocation()

  if (!isLoggedIn || !user) return <NotLoggedIn />

  const handleLogout = () => {
    clearAuthUser()
    navigate('/')
  }

  const stats = [
    { label: 'Serviços', value: '3' },
    { label: 'Avaliações', value: '4.9' },
    { label: 'Eventos', value: '12' },
  ]

  const menuSections = [
    {
      title: 'Conta',
      items: [
        { icon: Mic2, label: 'Meus Serviços', href: '/anunciar', badge: '3' },
        { icon: MessageCircle, label: 'Mensagens', href: '/mensagens', badge: '2' },
        { icon: Heart, label: 'Favoritos', href: '/explorar' },
      ],
    },
    {
      title: 'Configurações',
      items: [
        { icon: Settings, label: 'Editar Perfil', href: '/perfil/editar' },
        { icon: Bell, label: 'Notificações', href: '/perfil/notificacoes' },
        { icon: Lock, label: 'Privacidade e Segurança', href: '/perfil/seguranca' },
      ],
    },
    {
      title: 'Suporte',
      items: [
        { icon: HelpCircle, label: 'Central de Ajuda', href: '/sobre' },
        { icon: Shield, label: 'Sobre a Stage', href: '/sobre' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-24 lg:pb-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">

          {/* Profile card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 mt-6">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl font-bold text-foreground truncate">{user.name}</h1>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Verificado</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{user.bio}</p>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {stats.map(({ label, value }) => (
                <div key={label} className="bg-muted/50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Membro desde {user.joinedAt}</span>
            </div>
          </div>

          {/* Menu sections */}
          {menuSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">{section.title}</p>
              <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border/50">
                {section.items.map(({ icon: Icon, label, href, badge }) => (
                  <Link key={label} href={href}>
                    <div className="flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                      {badge && (
                        <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground">{badge}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full h-12 border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50 mt-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>

        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
