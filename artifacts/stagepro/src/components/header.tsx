import { Link, useLocation } from 'wouter'
import { useState, useEffect } from 'react'
import { Search, Menu, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/explorar', label: 'Explorar' },
  { href: '/sobre', label: 'Sobre' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [pathname] = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-top">
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Stage" className="h-10 w-10 rounded-lg object-cover transition-transform group-hover:scale-105" />
              <span className="text-xl font-semibold text-foreground tracking-tight">Stage</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <div className="relative">
                {showSearch ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <Input
                      placeholder="Buscar artistas, serviços..."
                      className="w-64 h-9 bg-muted/50 border-border/50 focus:border-primary/50 text-sm"
                      autoFocus
                      onBlur={() => setShowSearch(false)}
                    />
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-9 w-9" onClick={() => setShowSearch(true)}>
                    <Search className="w-[18px] h-[18px]" />
                  </Button>
                )}
              </div>
              <Link href="/mensagens">
                <Button variant="ghost" size="icon" className={cn('h-9 w-9', pathname === '/mensagens' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50')}>
                  <ShoppingBag className="w-[18px] h-[18px]" />
                </Button>
              </Link>
              <Link href="/anunciar">
                <Button variant="outline" size="sm" className={cn('h-9 px-4 text-sm font-medium border-primary/40 text-primary hover:bg-primary/10', pathname === '/anunciar' && 'bg-primary/10')}>Anunciar</Button>
              </Link>
              <div className="w-px h-6 bg-border/50 mx-1" />
              <Link href="/entrar">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-9 px-4 text-sm font-medium">Entrar</Button>
              </Link>
              <Link href="/cadastrar">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 text-sm font-medium">Cadastrar</Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-9 w-9" onClick={() => setShowSearch(!showSearch)}>
                <Search className="w-5 h-5" />
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><Menu className="w-5 h-5" /></Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-border/50 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-border/50">
                      <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                        <img src="/logo.png" alt="Stage" className="h-9 w-9 rounded-lg object-cover" />
                        <span className="text-xl font-semibold text-foreground tracking-tight">Stage</span>
                      </Link>
                    </div>
                    <nav className="flex flex-col p-4 gap-1">
                      {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50">{link.label}</Link>
                      ))}
                      <Link href="/mensagens" onClick={() => setIsOpen(false)} className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50">Mensagens</Link>
                    </nav>
                    <div className="mt-auto p-6 border-t border-border/50 flex flex-col gap-3">
                      <Link href="/anunciar" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full h-11 border-primary/40 text-primary hover:bg-primary/10">Anunciar</Button>
                      </Link>
                      <Link href="/entrar" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full h-11 border-border/50 hover:bg-muted/50 text-foreground">Entrar</Button>
                      </Link>
                      <Link href="/cadastrar" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">Cadastrar</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {showSearch && (
            <div className="lg:hidden pb-4 animate-fade-in">
              <Input placeholder="Buscar artistas, serviços, equipamentos..." className="w-full h-11 bg-muted/50 border-border/50 focus:border-primary/50" autoFocus />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
