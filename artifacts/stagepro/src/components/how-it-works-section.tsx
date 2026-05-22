import { Search, Calendar, Handshake, Star } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Busque', description: 'Explore milhares de artistas, equipamentos e serviços em nossa plataforma.', step: '01' },
  { icon: Calendar, title: 'Reserve', description: 'Entre em contato, negocie e agende diretamente com o profissional.', step: '02' },
  { icon: Handshake, title: 'Contrate', description: 'Feche o contrato com segurança e garantia de satisfação.', step: '03' },
  { icon: Star, title: 'Avalie', description: 'Após o evento, avalie o serviço e ajude outros usuários.', step: '04' },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-primary font-medium mb-3">Como Funciona</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Simples e Rápido</h2>
          <p className="text-muted-foreground text-lg">Em poucos passos você encontra e contrata o profissional perfeito para seu evento.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="relative bg-card border border-border rounded-2xl p-6 lg:p-8">
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">{step.step}</span>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5"><Icon className="w-7 h-7 text-primary" /></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
