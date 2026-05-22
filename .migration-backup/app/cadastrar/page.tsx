'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function CadastrarPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState('artista')
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Back Link */}
          <button
            onClick={() => step > 1 ? setStep(step - 1) : undefined}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Voltar' : <Link href="/">Voltar ao início</Link>}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">StagePro</span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              2
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {step === 1 ? 'Criar sua conta' : 'Completar cadastro'}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 
                ? 'Escolha o tipo de conta e preencha seus dados' 
                : 'Só mais alguns detalhes para finalizar'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                {/* Account Type */}
                <div>
                  <Label className="mb-4 block">Tipo de conta</Label>
                  <RadioGroup value={accountType} onValueChange={setAccountType} className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem
                        value="artista"
                        id="artista"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="artista"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-4 hover:bg-secondary/50 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
                      >
                        <span className="text-2xl mb-2">🎨</span>
                        <span className="font-medium">Artista</span>
                        <span className="text-xs text-muted-foreground">Ofereço serviços</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="contratante"
                        id="contratante"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="contratante"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-4 hover:bg-secondary/50 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all"
                      >
                        <span className="text-2xl mb-2">💼</span>
                        <span className="font-medium">Contratante</span>
                        <span className="text-xs text-muted-foreground">Busco serviços</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Seu nome"
                      className="mt-2 h-12 bg-card border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sobrenome">Sobrenome</Label>
                    <Input
                      id="sobrenome"
                      type="text"
                      placeholder="Seu sobrenome"
                      className="mt-2 h-12 bg-card border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-2 h-12 bg-card border-border"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      className="h-12 bg-card border-border pr-12"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {accountType === 'artista' ? (
                  <>
                    <div>
                      <Label htmlFor="nome-artistico">Nome artístico / Empresa</Label>
                      <Input
                        id="nome-artistico"
                        type="text"
                        placeholder="Como você quer ser encontrado"
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="categoria">Categoria principal</Label>
                      <Input
                        id="categoria"
                        type="text"
                        placeholder="Ex: Cantor, DJ, Fotógrafo..."
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        type="text"
                        placeholder="Sua cidade"
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="empresa">Nome da empresa (opcional)</Label>
                      <Input
                        id="empresa"
                        type="text"
                        placeholder="Sua empresa"
                        className="mt-2 h-12 bg-card border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        type="text"
                        placeholder="Sua cidade"
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="mt-2 h-12 bg-card border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="interesse">Interesse principal</Label>
                      <Input
                        id="interesse"
                        type="text"
                        placeholder="Ex: Eventos corporativos, Festas..."
                        className="mt-2 h-12 bg-card border-border"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-1" required />
                  <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                    Li e aceito os{' '}
                    <Link href="/termos" className="text-primary hover:underline">
                      Termos de Uso
                    </Link>
                    {' '}e a{' '}
                    <Link href="/privacidade" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : step === 1 ? 'Continuar' : 'Criar conta'}
            </Button>
          </form>

          {step === 1 && (
            <>
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 border-border">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 border-border">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/entrar" className="text-primary hover:underline font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=1600&fit=crop"
          alt="Artista no palco"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/40?img=1" className="w-10 h-10 rounded-full border-2 border-background" alt="" />
              <img src="https://i.pravatar.cc/40?img=2" className="w-10 h-10 rounded-full border-2 border-background" alt="" />
              <img src="https://i.pravatar.cc/40?img=3" className="w-10 h-10 rounded-full border-2 border-background" alt="" />
              <img src="https://i.pravatar.cc/40?img=4" className="w-10 h-10 rounded-full border-2 border-background" alt="" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">+2.500</span> artistas já cadastrados
            </p>
          </div>
          <blockquote className="text-foreground">
            <p className="text-xl font-medium">
              {accountType === 'artista' 
                ? '"Aumentei minha visibilidade e fechei 3x mais contratos depois de me cadastrar no StagePro."'
                : '"Encontrar o DJ perfeito para meu evento nunca foi tão fácil. Recomendo!"'
              }
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
