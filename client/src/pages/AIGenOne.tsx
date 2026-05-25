import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Zap,
  Users,
  Shield,
  Database,
  Link2,
  Search,
  BarChart3,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Building2,
  User,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useLocale } from "@/lib/i18n-utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const featureIcons = [Users, BarChart3, Database, Search, Shield, Link2];
const targetIcons = [Building2, User, Zap, Settings];
const securityIcons = [Database, ShieldCheck, Shield, Search];

export default function AIGenOne() {
  const { t } = useTranslation("aigen-one");
  const { locale } = useLocale();

  useEffect(() => {
    document.title = t("meta.title");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta.description"));
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = t("meta.description");
      document.head.appendChild(meta);
    }
  }, [t]);

  const problems = t("problems.items", { returnObjects: true }) as any[];
  const steps = t("howItWorks.steps", { returnObjects: true }) as any[];
  const exchanges = t("demo.exchanges", { returnObjects: true }) as any[];
  const features = t("features.items", { returnObjects: true }) as any[];
  const comparisonRows = t("comparison.rows", { returnObjects: true }) as string[][];
  const comparisonHeaders = t("comparison.headers", { returnObjects: true }) as string[];
  const targets = t("targets.items", { returnObjects: true }) as any[];
  const security = t("security.items", { returnObjects: true }) as any[];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 max-w-5xl py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-3">
              {t("hero.eyebrow")}
            </p>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href={`/${locale}/contact`}>
                  {t("hero.buttons.contact")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                {t("hero.buttons.demo")}
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("problems.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 whitespace-pre-line">
              {t("problems.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("problems.lead")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {problems.map((item: any, i: number) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <span className="text-3xl font-bold text-primary/20">{item.number}</span>
                    <h3 className="text-lg font-semibold mt-2 mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("howItWorks.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 whitespace-pre-line">
              {t("howItWorks.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("howItWorks.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-border -translate-x-3 translate-y-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo conversations */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("demo.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("demo.title")}</h2>
            <p className="text-muted-foreground">{t("demo.description")}</p>
          </motion.div>

          <div className="space-y-8">
            {exchanges.map((ex: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="space-y-3"
              >
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-primary text-primary-foreground rounded-lg rounded-br-sm px-4 py-3 text-sm leading-relaxed">
                    {ex.user}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-card border border-border rounded-lg rounded-bl-sm px-4 py-3 text-sm leading-relaxed flex gap-3">
                    <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{ex.ai}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("features.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("features.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("features.description")}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat: any, i: number) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full hover-elevate">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">{feat.category}</Badge>
                          <h3 className="font-semibold mb-2">{feat.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("comparison.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">{t("comparison.title")}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-0 px-0 pb-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        {comparisonHeaders.map((h: string, i: number) => (
                          <th key={i} className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row: string[], i: number) => {
                        const isHighlight = i === comparisonRows.length - 1;
                        return (
                          <tr key={i} className={`border-b border-border last:border-0 ${isHighlight ? "bg-primary/5" : ""}`}>
                            {row.map((cell: string, j: number) => (
                              <td key={j} className={`px-6 py-4 leading-snug ${isHighlight ? "font-semibold text-primary" : "text-foreground"} ${j > 0 && !isHighlight ? "text-muted-foreground" : ""}`}>
                                {isHighlight && j === 0 ? (
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    {cell}
                                  </div>
                                ) : cell}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Target users */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("targets.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 whitespace-pre-line">
              {t("targets.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("targets.description")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {targets.map((item: any, i: number) => {
              const Icon = targetIcons[i % targetIcons.length];
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="pt-6 flex gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t("security.eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 whitespace-pre-line">
              {t("security.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("security.description")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {security.map((item: any, i: number) => {
              const Icon = securityIcons[i % securityIcons.length];
              return (
                <motion.div key={i} variants={itemVariants}>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {t("cta.eyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 whitespace-pre-line leading-snug">
              {t("cta.title")}
            </h2>
            <p className="text-slate-300 mb-10">{t("cta.description")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href={`/${locale}/contact`}>
                  {t("cta.buttons.contact")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                {t("cta.buttons.demo")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
