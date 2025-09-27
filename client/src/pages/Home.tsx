import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import NewsSection from "@/components/NewsSection";
import VisionBlock from "@/components/VisionBlock";
import CTASection from "@/components/CTASection";
import { Mail, MessageCircle } from "lucide-react";

// TODO: remove mock functionality - replace with real data from API
import lingaLinkImage from "@assets/generated_images/LingaLink_learning_dashboard_mockup_3e4a3eec.png";
import eduMateImage from "@assets/generated_images/EduMate_collaboration_interface_5d5ed6fd.png";
import officeBrainImage from "@assets/generated_images/OfficeBrain_file_system_interface_be3ae664.png";
import enterpriseLLMImage from "@assets/stock_images/enterprise_ai_dashbo_34de58a9.jpg";
import baydSystemImage from "@assets/generated_images/Bayd-System_studio_dashboard_36de2e47.png";

export default function Home() {
  // TODO: remove mock functionality - replace with API calls
  const featuredProducts = [
    {
      id: "lingalink",
      name: "LingaLink",
      description: "オンラインレッスンでAIが自動レビューを行うコーチングサービス。パーソナライズされた学習体験を提供します。",
      image: lingaLinkImage,
      status: "released" as const,
      tags: ["教育", "AI", "オンライン学習"],
      href: "/products/lingalink"
    },
    {
      id: "edumate",
      name: "EduMate",
      description: "友達と一緒に授業の復習や共同勉強を進めて、親へのレポートも作成できるサービスです。",
      image: eduMateImage,
      status: "beta" as const,
      tags: ["教育", "協働学習", "レポート"],
      href: "/products/edumate"
    },
    {
      id: "officebrain",
      name: "OfficeBrain",
      description: "組織内のファイルを共有して権限を管理できるRAGシステム。セキュアな情報共有を実現します。",
      image: officeBrainImage,
      status: "released" as const,
      tags: ["企業", "RAG", "ファイル管理"],
      href: "/products/officebrain"
    },
    {
      id: "enterprise-llm",
      name: "Enterprise LLM",
      description: "プロジェクト管理・ナレッジ共有・AIアシスタントを統合したオールインワン企業プラットフォーム。",
      image: enterpriseLLMImage,
      status: "released" as const,
      tags: ["企業", "LLM", "統合プラットフォーム"],
      href: "/products/enterprise-llm"
    },
    {
      id: "bayd-system",
      name: "Bayd-System",
      description: "音楽リハーサルスタジオ管理システム。条件によりAIで最適なスタジオを検索、予約から機材管理まで包括的にサポートします。",
      image: baydSystemImage,
      status: "coming_soon" as const,
      tags: ["音楽", "スタジオ", "管理システム"],
      href: "/products/bayd-system"
    }
  ];

  // TODO: remove mock functionality - replace with API calls
  const latestNews = [
    {
      id: "ai-news-1",
      title: "生成AIの教育分野への応用が急速に拡大",
      summary: "OpenAIのGPT-4やGoogle Bardなどの大規模言語モデルが教育現場で活用され、個別指導やカリキュラム作成の効率化が進んでいます。",
      source: "AI News Japan",
      publishedAt: "2024-12-27",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      isExternal: true,
      href: "https://example.com/ai-education-news"
    },
    {
      id: "ai-news-2",
      title: "企業向けRAGシステムの導入が加速",
      summary: "Retrieval-Augmented Generation技術を活用した企業内検索システムが注目を集め、情報管理の効率化が期待されています。",
      source: "Tech Review",
      publishedAt: "2024-12-26",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      isExternal: false,
      href: "/news/rag-systems-enterprise"
    },
    {
      id: "ai-news-3",
      title: "音楽制作AIツールの新たな可能性",
      summary: "AIを活用した音楽制作ツールが進化し、アーティストとAIの協創による新しい表現手法が生まれています。",
      source: "Music Tech Today",
      publishedAt: "2024-12-25",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      isExternal: true,
      href: "https://example.com/ai-music-tools"
    }
  ];

  const visionBullets = [
    "お打ち合わせ当日に動作するプロトタイプをお見せし、ご要望を即座に形にします",
    "プロトタイプから本格システムまで一貫した開発体制で、スムーズな移行を実現します",
    "実際のビジネス課題に即したAIソリューションで、実用性の高いシステムを構築します",
    "迅速な開発サイクルにより、市場投入までの時間を大幅に短縮します"
  ];

  const ctaActions = [
    {
      label: "お問い合わせ",
      href: "/contact",
      variant: "secondary" as const,
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: "ニュースレター登録",
      href: "/newsletter",
      variant: "outline" as const,
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <main>
      <HeroSection
        title="D'achy.Studio"
        subtitle="AIの力で未来を創造する。革新的なプロダクトとソリューションを通じて、テクノロジーの可能性を実現します。"
        primaryCta={{ label: "プロダクトを見る", href: "/products" }}
        secondaryCta={{ label: "詳しく知る", href: "/about" }}
      />
      
      <ProductGrid
        title="日常からビジネスまで、人に寄り添うAIソリューション"
        products={featuredProducts}
        ctaHref="/products"
      />
      
      <VisionBlock
        heading="プロトタイプ作成からのシステム開発"
        bullets={visionBullets}
      />
      
      <NewsSection
        title="最新AIニュース"
        items={latestNews}
        ctaHref="/news"
      />
      
      <CTASection
        title="AIの可能性を一緒に探求しませんか？"
        actions={ctaActions}
      />
    </main>
  );
}