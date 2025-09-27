import { useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import { useTranslation } from "react-i18next";
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
import News from "@/pages/News";
import LingaLink from "@/pages/LingaLink";
import Edumate from "@/pages/Edumate";
import OfficeBrain from "@/pages/OfficeBrain";
import EnterpriseLLM from "@/pages/EnterpriseLLM";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { extractLocaleFromPath, linkTo } from "@/lib/i18n-utils";
import { defaultLocale, isValidLocale, type Locale } from "@shared/i18n";

function Router() {
  const [location] = useLocation();
  const { i18n } = useTranslation();
  
  // Extract locale and clean path from current location
  const { locale, cleanPath } = extractLocaleFromPath(location);
  
  // Update i18n language when locale changes in URL
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      {/* Root redirect to default locale */}
      <Route path="/">
        <Redirect to={linkTo('/', defaultLocale)} />
      </Route>
      
      {/* Locale-prefixed routes */}
      <Route path="/:locale">
        {(params) => {
          const localeParam = params.locale;
          if (!isValidLocale(localeParam)) {
            return <NotFound />;
          }
          return <Home />;
        }}
      </Route>
      
      <Route path="/:locale/products">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <Products />;
        }}
      </Route>
      
      <Route path="/:locale/products/lingalink">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <LingaLink />;
        }}
      </Route>
      
      <Route path="/:locale/products/edumate">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <Edumate />;
        }}
      </Route>
      
      <Route path="/:locale/products/officebrain">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <OfficeBrain />;
        }}
      </Route>
      
      <Route path="/:locale/products/enterprise-llm">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <EnterpriseLLM />;
        }}
      </Route>
      
      <Route path="/:locale/about">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <About />;
        }}
      </Route>
      
      <Route path="/:locale/contact">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <Contact />;
        }}
      </Route>
      
      <Route path="/:locale/news">
        {(params) => {
          if (!isValidLocale(params.locale)) return <NotFound />;
          return <News />;
        }}
      </Route>
      
      {/* Catch-all for invalid routes */}
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
        { name: "Enterprise LLM", href: "/products/enterprise-llm" },
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