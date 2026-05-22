import { useState } from 'react'
import { Link } from 'wouter'
import {
  Search, Send, Paperclip, Smile, MoreVertical,
  Phone, Video, ArrowLeft, CheckCheck, Check, Star, Circle
} from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  content: string
  time: string
  fromMe: boolean
  status?: 'sent' | 'delivered' | 'read'
}

interface Conversation {
  id: number
  name: string
  avatar: string
  role: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Maria Silva',
    avatar: 'https://i.pravatar.cc/48?img=20',
    role: 'Cantora & Compositora',
    lastMessage: 'Ótimo! Posso confirmar a data de 15 de junho.',
    time: 'Agora',
    unread: 2,
    online: true,
    messages: [
      { id: 1, content: 'Olá Maria! Vi seu perfil na Stage e adorei seu trabalho com MPB.', time: '14:30', fromMe: true, status: 'read' },
      { id: 2, content: 'Olá! Que bom que gostou 😊 Posso te ajudar com algum evento?', time: '14:32', fromMe: false },
      { id: 3, content: 'Sim! Estou organizando um casamento para dia 15 de junho em São Paulo. Você estaria disponível?', time: '14:35', fromMe: true, status: 'read' },
      { id: 4, content: 'Deixa eu verificar minha agenda... 📅', time: '14:36', fromMe: false },
      { id: 5, content: 'Ótimo! Posso confirmar a data de 15 de junho. Qual o tamanho do evento e quantas horas de show você precisa?', time: '14:38', fromMe: false },
    ],
  },
  {
    id: 2,
    name: 'DJ Anderson',
    avatar: 'https://i.pravatar.cc/48?img=53',
    role: 'DJ & Produtor Musical',
    lastMessage: 'O cachê para 4 horas é R$ 2.400. Inclui...',
    time: 'há 1h',
    unread: 0,
    online: true,
    messages: [
      { id: 1, content: 'Oi Anderson! Preciso de um DJ para uma festa corporativa de fim de ano, dia 20 de dezembro.', time: '13:00', fromMe: true, status: 'read' },
      { id: 2, content: 'Oi! Boa tarde! Tenho disponibilidade sim para o dia 20. Qual a previsão de duração da festa?', time: '13:15', fromMe: false },
      { id: 3, content: 'Provavelmente 4 horas, das 20h às 00h. Seria em um espaço para umas 150 pessoas.', time: '13:20', fromMe: true, status: 'read' },
      { id: 4, content: 'O cachê para 4 horas é R$ 2.400. Inclui todo o equipamento de som necessário e 2 assistentes. O estilo seria mais voltado para pop, eletrônico e MPB, certo?', time: '13:45', fromMe: false },
    ],
  },
  {
    id: 3,
    name: 'Studio Arte Visual',
    avatar: 'https://i.pravatar.cc/48?img=47',
    role: 'Fotografia & Vídeo',
    lastMessage: 'Perfeito! Vou enviar o contrato por email.',
    time: 'há 3h',
    unread: 0,
    online: false,
    messages: [
      { id: 1, content: 'Boa tarde! Gostaria de contratar o serviço de fotografia para meu casamento.', time: '10:00', fromMe: true, status: 'read' },
      { id: 2, content: 'Boa tarde! Claro, será um prazer! Qual a data e local do evento?', time: '10:05', fromMe: false },
      { id: 3, content: 'Será no dia 8 de março, no Espaço Cultural Jardins em São Paulo. Será das 17h às 23h.', time: '10:10', fromMe: true, status: 'read' },
      { id: 4, content: 'Que data linda! Temos disponibilidade. Nosso pacote para 6 horas inclui: 2 fotógrafos, edição profissional de 300 fotos, álbum digital em alta resolução e vídeo highlights de 3 minutos. Valor: R$ 3.800.', time: '10:25', fromMe: false },
      { id: 5, content: 'Adorei o pacote! Vamos fechar!', time: '11:00', fromMe: true, status: 'read' },
      { id: 6, content: 'Perfeito! Vou enviar o contrato por email. Precisarei de um sinal de 30% para confirmar a data. 🎉', time: '11:05', fromMe: false },
    ],
  },
  {
    id: 4,
    name: 'Ballet Contemporâneo SP',
    avatar: 'https://i.pravatar.cc/48?img=44',
    role: 'Dança & Coreografia',
    lastMessage: 'Você: Vou pensar e te respondo amanhã.',
    time: 'Ontem',
    unread: 0,
    online: false,
    messages: [
      { id: 1, content: 'Olá! Estou procurando uma apresentação de dança contemporânea para um evento cultural no meu município.', time: 'Ontem 15:00', fromMe: true, status: 'read' },
      { id: 2, content: 'Olá! Que projeto incrível! Trabalhamos com apresentações de 20 a 60 minutos. Qual o público esperado e o orçamento previsto?', time: 'Ontem 15:30', fromMe: false },
      { id: 3, content: 'Esperamos cerca de 500 pessoas. O orçamento é de R$ 4.000 a R$ 6.000.', time: 'Ontem 15:45', fromMe: true, status: 'read' },
      { id: 4, content: 'Perfeito! Temos um espetáculo de 45 minutos que se encaixa muito bem nesse formato. Posso enviar nosso portfólio e um orçamento detalhado?', time: 'Ontem 16:00', fromMe: false },
      { id: 5, content: 'Vou pensar e te respondo amanhã.', time: 'Ontem 16:30', fromMe: true, status: 'delivered' },
    ],
  },
  {
    id: 5,
    name: 'Som & Luz Eventos',
    avatar: 'https://i.pravatar.cc/48?img=60',
    role: 'Equipamentos Profissionais',
    lastMessage: 'Bom dia! Segue a proposta detalhada 📎',
    time: 'Seg',
    unread: 1,
    online: false,
    messages: [
      { id: 1, content: 'Preciso de locação de equipamentos para um show ao ar livre. Público estimado de 800 pessoas.', time: 'Seg 09:00', fromMe: true, status: 'read' },
      { id: 2, content: 'Bom dia! Segue a proposta detalhada 📎', time: 'Seg 09:30', fromMe: false },
    ],
  },
]

export default function MensagensPage() {
  const [selectedConv, setSelectedConv] = useState<Conversation>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showList, setShowList] = useState(true)

  const filteredConvs = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSend = () => {
    if (!newMessage.trim()) return
    setNewMessage('')
  }

  const handleSelectConv = (conv: Conversation) => {
    setSelectedConv(conv)
    setShowList(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 pb-16 lg:pb-0 flex overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>

        {/* Sidebar */}
        <aside className={cn(
          'w-full lg:w-80 xl:w-96 border-r border-border flex flex-col bg-card/30',
          'lg:flex',
          showList ? 'flex' : 'hidden'
        )}>
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground mb-3">Mensagens</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-muted/50 border-border/50 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map(conv => (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv)}
                className={cn(
                  'w-full flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors text-left border-b border-border/30',
                  selectedConv.id === conv.id ? 'bg-primary/8 border-l-2 border-l-primary' : ''
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm truncate">{conv.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full shrink-0 mt-1">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <div className={cn(
          'flex-1 flex flex-col min-w-0',
          'lg:flex',
          showList ? 'hidden' : 'flex'
        )}>
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
            <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setShowList(true)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative shrink-0">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedConv.avatar} />
                <AvatarFallback>{selectedConv.name[0]}</AvatarFallback>
              </Avatar>
              {selectedConv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/servico/1`} className="font-semibold text-foreground hover:text-primary transition-colors truncate block">
                {selectedConv.name}
              </Link>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {selectedConv.online
                  ? <><Circle className="w-2 h-2 fill-green-500 text-green-500" />Online agora</>
                  : selectedConv.role
                }
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Service Card in chat */}
          <div className="px-4 pt-4">
            <Link href="/servico/1" className="flex items-center gap-3 bg-card border border-border/50 rounded-xl p-3 hover:border-primary/30 transition-colors group mb-2 max-w-sm mx-auto lg:mx-0">
              <img src={selectedConv.avatar} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{selectedConv.name}</p>
                <p className="text-xs text-muted-foreground">{selectedConv.role}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                <span className="text-xs font-medium">4.9</span>
              </div>
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {selectedConv.messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.fromMe ? 'justify-end' : 'justify-start')}>
                {!msg.fromMe && (
                  <Avatar className="w-7 h-7 mr-2 mt-1 shrink-0">
                    <AvatarImage src={selectedConv.avatar} />
                    <AvatarFallback>{selectedConv.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  'max-w-[75%] lg:max-w-[60%] rounded-2xl px-4 py-2.5',
                  msg.fromMe
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-card border border-border/50 text-foreground rounded-tl-sm'
                )}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className={cn('flex items-center gap-1 mt-1', msg.fromMe ? 'justify-end' : 'justify-start')}>
                    <span className={cn('text-[10px]', msg.fromMe ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.time}</span>
                    {msg.fromMe && (
                      msg.status === 'read'
                        ? <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
                        : msg.status === 'delivered'
                          ? <CheckCheck className="w-3 h-3 text-primary-foreground/50" />
                          : <Check className="w-3 h-3 text-primary-foreground/50" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Demo notice */}
          <div className="mx-4 mb-2">
            <div className="bg-muted/50 border border-border/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Demonstração</strong> — O sistema de mensagens real requer autenticação.{' '}
                <Link href="/entrar" className="text-primary hover:underline">Entrar</Link> para usar.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="flex items-end gap-3 bg-muted/50 border border-border rounded-2xl px-4 py-3">
              <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mb-0.5">
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder={`Mensagem para ${selectedConv.name}...`}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[24px] max-h-32"
                rows={1}
              />
              <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mb-0.5">
                <Smile className="w-5 h-5" />
              </button>
              <Button
                size="icon"
                className={cn(
                  'h-9 w-9 rounded-xl shrink-0 transition-all',
                  newMessage.trim()
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
