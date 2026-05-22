'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Menu, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

const navLinks = [
  { href: '/explorar?tipo=artistas', label: 'Artistas' },
  { href: '/explorar?tipo=equipamentos', label: 'Equipamentos' },
  { href: '/explorar?tipo=servicos', label: 'Serviços' },
  { href: '/sobre', label: 'Sobre' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-top">
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-base">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight">StagePro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium rounded-lg hover:bg-muted/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-9 w-9"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="w-[18px] h-[18px]" />
                  </Button>
                )}
              </div>
              
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-9 w-9">
                <ShoppingBag className="w-[18px] h-[18px]" />
              </Button>
              
              <div className="w-px h-6 bg-border/50 mx-1" />
              
              <Link href="/entrar">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-9 px-4 text-sm font-medium">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastrar">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 text-sm font-medium">
                  Cadastrar
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground h-9 w-9"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-border/50 p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="p-6 border-b border-border/50">
                      <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-base">S</span>
                        </div>
                        <span className="text-xl font-semibold text-foreground tracking-tight">StagePro</span>
                      </Link>
                    </div>
                    
                    {/* Mobile Nav */}
                    <nav className="flex flex-col p-4 gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                    
                    {/* Mobile Actions */}
                    <div className="mt-auto p-6 border-t border-border/50 flex flex-col gap-3">
                      <Link href="/entrar" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full h-11 border-border/50 hover:bg-muted/50 text-foreground">
                          Entrar
                        </Button>
                      </Link>
                      <Link href="/cadastrar" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                          Cadastrar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="lg:hidden pb-4 animate-fade-in">
              <Input 
                placeholder="Buscar artistas, serviços, equipamentos..." 
                className="w-full h-11 bg-muted/50 border-border/50 focus:border-primary/50"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
