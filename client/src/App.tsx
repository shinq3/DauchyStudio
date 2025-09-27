import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import LingaLink from "@/pages/LingaLink";
import Edumate from "@/pages/Edumate";
import OfficeBrain from "@/pages/OfficeBrain";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/lingalink" component={LingaLink} />
      <Route path="/products/edumate" component={Edumate} />
      <Route path="/products/officebrain" component={OfficeBrain} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      {/* TODO: Add product detail, news pages when backend is ready */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // TODO: remove mock functionality - replace with real data from CMS
  const footerLinks = [
    {
      title: "プロダクト",
      items: [
        { name: "LingaLink", href: "/products/lingalink" },
        { name: "EduMate", href: "/products/edumate" },
        { name: "OfficeBrain", href: "/products/officebrain" },
        { name: "Bayd-System", href: "/products/bayd-system" }
      ]
    },
    {
      title: "会社情報",
      items: [
        { name: "私たちについて", href: "/about" },
        { name: "ニュース", href: "/news" },
        { name: "キャリア", href: "/careers" },
        { name: "お問い合わせ", href: "/contact" }
      ]
    }
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/dachy-studio", icon: <Github className="w-4 h-4" /> },
    { name: "Twitter", href: "https://twitter.com/dachy_studio", icon: <Twitter className="w-4 h-4" /> },
    { name: "LinkedIn", href: "https://linkedin.com/company/dachy-studio", icon: <Linkedin className="w-4 h-4" /> },
    { name: "Email", href: "mailto:contact@dachy.studio", icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer
              company="D'achy.Studio"
              address="東京都渋谷区恵比寿1-1-1"
              links={footerLinks}
              social={socialLinks}
            />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;