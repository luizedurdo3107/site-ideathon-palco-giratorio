import { Link } from 'wouter'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                Pronto para Brilhar no{' '}<span className="text-primary">Palco</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Cadastre-se agora e comece a divulgar seus serviços para milhares de pessoas e empresas que buscam talentos como você.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cadastrar">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-6">
                    Começar Agora <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/sobre">
                  <Button variant="outline" size="lg" className="border-border hover:bg-secondary h-12 px-6">Saiba Mais</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-secondary/50 rounded-2xl p-6"><p className="text-3xl lg:text-4xl font-bold text-primary mb-1">100%</p><p className="text-sm text-muted-foreground">Gratuito para cadastro</p></div>
              <div className="bg-secondary/50 rounded-2xl p-6"><p className="text-3xl lg:text-4xl font-bold text-primary mb-1">24h</p><p className="text-sm text-muted-foreground">Aprovação rápida</p></div>
              <div className="bg-secondary/50 rounded-2xl p-6"><p className="text-3xl lg:text-4xl font-bold text-primary mb-1">50k+</p><p className="text-sm text-muted-foreground">Usuários ativos</p></div>
              <div className="bg-secondary/50 rounded-2xl p-6"><p className="text-3xl lg:text-4xl font-bold text-primary mb-1">R$5M+</p><p className="text-sm text-muted-foreground">Movimentados</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
