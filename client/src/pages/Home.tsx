import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import NewsSection from "@/components/NewsSection";
import VisionBlock from "@/components/VisionBlock";
import CTASection from "@/components/CTASection";
import { Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { linkTo, useLocale } from "@/lib/i18n-utils";

// TODO: remove mock functionality - replace with real data from API
import lingaLinkImage from "@assets/generated_images/LingaLink_learning_dashboard_mockup_3e4a3eec.png";
import eduMateImage from "@assets/generated_images/EduMate_collaboration_interface_5d5ed6fd.png";
import officeBrainImage from "@assets/generated_images/OfficeBrain_file_system_interface_be3ae664.png";
import enterpriseLLMImage from "@assets/stock_images/enterprise_ai_dashbo_34de58a9.jpg";
import baydSystemImage from "@assets/generated_images/Bayd-System_studio_dashboard_36de2e47.png";

export default function Home() {
  const { t } = useTranslation(['home', 'products', 'common']);
  const { locale } = useLocale();

  // TODO: remove mock functionality - replace with API calls
  const featuredProducts = [
    {
      id: "lingalink",
      name: t('products:lingalink.name'),
      description: t('products:lingalink.description'),
      image: lingaLinkImage,
      status: "released" as const,
      tags: t('products:lingalink.tags', { returnObjects: true }) as string[],
      href: linkTo("/products/lingalink", locale)
    },
    {
      id: "edumate",
      name: t('products:edumate.name'),
      description: t('products:edumate.description'),
      image: eduMateImage,
      status: "beta" as const,
      tags: t('products:edumate.tags', { returnObjects: true }) as string[],
      href: linkTo("/products/edumate", locale)
    },
    {
      id: "officebrain",
      name: t('products:officebrain.name'),
      description: t('products:officebrain.description'),
      image: officeBrainImage,
      status: "released" as const,
      tags: t('products:officebrain.tags', { returnObjects: true }) as string[],
      href: linkTo("/products/officebrain", locale)
    },
    {
      id: "enterprise-llm",
      name: t('products:enterprisellm.name'),
      description: t('products:enterprisellm.description'),
      image: enterpriseLLMImage,
      status: "released" as const,
      tags: t('products:enterprisellm.tags', { returnObjects: true }) as string[],
      href: linkTo("/products/enterprise-llm", locale)
    },
    {
      id: "bayd-system",
      name: t('products:baydsystem.name'),
      description: t('products:baydsystem.description'),
      image: baydSystemImage,
      status: "coming_soon" as const,
      tags: t('products:baydsystem.tags', { returnObjects: true }) as string[],
      href: linkTo("/products/bayd-system", locale)
    }
  ];

  // TODO: remove mock functionality - replace with API calls
  const rawNewsItems = t('home:news.items', { returnObjects: true }) as any[];
  const latestNews = rawNewsItems.map(item => ({
    ...item,
    href: item.isExternal ? item.href : linkTo(item.href, locale)
  }));

  const visionBullets = [
    t('home:hero.features.rapid'),
    t('home:hero.features.development'),
    t('home:hero.features.expertise')
  ];

  const ctaActions = [
    {
      label: t('common:buttons.contact'),
      href: linkTo("/contact", locale),
      variant: "secondary" as const,
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: t('home:cta.newsletter'),
      href: linkTo("/newsletter", locale),
      variant: "outline" as const,
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <main>
      <HeroSection
        title={t('home:hero.title')}
        subtitle={t('home:hero.subtitle')}
        primaryCta={{ 
          label: t('header:navigation.products'), 
          href: linkTo("/products", locale) 
        }}
        secondaryCta={{ 
          label: t('common:buttons.learnMore'), 
          href: linkTo("/about", locale) 
        }}
      />
      
      <ProductGrid
        title={t('home:sections.products.subtitle')}
        products={featuredProducts}
        ctaHref={linkTo("/products", locale)}
      />
      
      <VisionBlock
        heading={t('home:sections.vision.title')}
        bullets={visionBullets}
      />
      
      <NewsSection
        title={t('home:sections.news.title')}
        items={latestNews}
        ctaHref={linkTo("/news", locale)}
      />
      
      <CTASection
        title={t('home:cta.title')} 
        actions={ctaActions}
      />
    </main>
  );
}