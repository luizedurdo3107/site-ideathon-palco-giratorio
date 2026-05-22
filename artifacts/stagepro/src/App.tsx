import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import ExplorarPage from "@/pages/explorar";
import EntrarPage from "@/pages/entrar";
import CadastrarPage from "@/pages/cadastrar";
import ServicoPage from "@/pages/servico";
import SobrePage from "@/pages/sobre";
import MensagensPage from "@/pages/mensagens";
import AnunciarPage from "@/pages/anunciar";
import PerfilPage from "@/pages/perfil";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/explorar" component={ExplorarPage} />
      <Route path="/entrar" component={EntrarPage} />
      <Route path="/cadastrar" component={CadastrarPage} />
      <Route path="/servico/:id" component={ServicoPage} />
      <Route path="/sobre" component={SobrePage} />
      <Route path="/mensagens" component={MensagensPage} />
      <Route path="/anunciar" component={AnunciarPage} />
      <Route path="/perfil" component={PerfilPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
