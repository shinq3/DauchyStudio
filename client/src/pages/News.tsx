import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  ExternalLink,
  Clock,
  Eye,
  ArrowRight,
  Tag
} from "lucide-react";
import newsroomImage from '@assets/stock_images/modern_newsroom_with_a0f99684.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function News() {
  const { t } = useTranslation('news');
  
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(t('categories.all') || "すべて");
  
  useEffect(() => {
    document.title = t('meta.title') || "AI・テクノロジーニュース | D'achy.Studio";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description') || 'AI・テクノロジー業界の最新ニュースとトレンドをお届け。生成AI、企業DX、教育技術など幅広い分野の情報を発信しています。');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('meta.description') || 'AI・テクノロジー業界の最新ニュースとトレンドをお届け。生成AI、企業DX、教育技術など幅広い分野の情報を発信しています。';
      document.head.appendChild(meta);
    }
  }, [t]);

  // TODO: remove mock functionality - replace with API calls
  const allNews = [
    {
      id: "ai-news-1",
      title: "生成AIの教育分野への応用が急速に拡大",
      summary: "OpenAIのGPT-4やGoogle Bardなどの大規模言語モデルが教育現場で活用され、個別指導やカリキュラム作成の効率化が進んでいます。教師の負担軽減と学習者の個別最適化を同時に実現する技術として注目されています。",
      content: "教育分野における生成AIの活用が急速に広がっています。従来の一律的な教育手法から脱却し、一人ひとりの学習スタイルや理解度に合わせたパーソナライズされた学習体験の提供が可能になりました。",
      source: "AI News Japan",
      author: "田中太郎",
      publishedAt: "2024-12-27",
      readTime: "5分",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/ai-education-news",
      tags: ["生成AI", "教育", "EdTech", "パーソナライズ"],
      category: "AI技術"
    },
    {
      id: "ai-news-2", 
      title: "企業向けRAGシステムの導入が加速",
      summary: "Retrieval-Augmented Generation技術を活用した企業内検索システムが注目を集め、情報管理の効率化が期待されています。社内ナレッジの活用と検索精度の向上により、業務効率が大幅に改善されています。",
      content: "RAG（Retrieval-Augmented Generation）システムは、企業が蓄積してきた膨大な内部資料やドキュメントを効率的に活用するための革新的なソリューションです。",
      source: "Tech Review",
      author: "佐藤花子",
      publishedAt: "2024-12-26",
      readTime: "7分",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/rag-systems-enterprise",
      tags: ["RAG", "企業DX", "検索システム", "ナレッジ管理"],
      category: "企業システム"
    },
    {
      id: "ai-news-3",
      title: "音楽制作AIツールの新たな可能性",
      summary: "AIを活用した音楽制作ツールが進化し、アーティストとAIの協創による新しい表現手法が生まれています。作曲からマスタリングまで、制作プロセス全体をサポートする統合的なAIプラットフォームが登場しました。",
      content: "音楽業界においてAI技術の導入が加速しており、従来の制作手法に革新をもたらしています。メロディ生成から歌詞作成、楽器演奏まで、AIが創造的なパートナーとして機能します。",
      source: "Music Tech Today",
      author: "山田次郎",
      publishedAt: "2024-12-25",
      readTime: "6分",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/ai-music-tools",
      tags: ["AI", "音楽制作", "クリエイティブ", "作曲"],
      category: "エンターテイメント"
    },
    {
      id: "ai-news-4",
      title: "ChatGPTのビジネス活用事例が急増",
      summary: "大規模言語モデルを活用したカスタマーサポート、マーケティング、業務自動化の導入事例が増加しています。中小企業でも手軽に導入できるソリューションとして、生産性向上に大きく貢献しています。",
      content: "ChatGPTをはじめとする対話型AIの企業活用が本格化しています。顧客対応の自動化、コンテンツ生成、社内業務の効率化など、様々な分野で成果を上げています。",
      source: "Business AI Weekly",
      author: "鈴木一郎",
      publishedAt: "2024-12-24",
      readTime: "8分",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/chatgpt-business-cases",
      tags: ["ChatGPT", "ビジネス活用", "自動化", "生産性"],
      category: "ビジネスAI"
    },
    {
      id: "ai-news-5",
      title: "ノーコードAI開発プラットフォームの普及",
      summary: "プログラミング知識がなくてもAIアプリケーションを開発できるノーコードプラットフォームが普及しています。ビジネスユーザーが直接AIソリューションを構築できる時代が到来しました。",
      content: "ノーコード・ローコード開発の波がAI分野にも到達し、技術的な専門知識がないビジネスパーソンでもAIアプリケーションを構築できるようになりました。",
      source: "No-Code Today",
      author: "高橋美咲",
      publishedAt: "2024-12-23",
      readTime: "5分",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/nocode-ai-platforms",
      tags: ["ノーコード", "AI開発", "プラットフォーム", "民主化"],
      category: "開発ツール"
    },
    {
      id: "ai-news-6",
      title: "AI画像生成技術の商用利用が本格化",
      summary: "DALL-E、Midjourney、Stable Diffusionなどの画像生成AIが商用プロジェクトで広く活用されています。広告、Webデザイン、商品開発など様々な分野でクリエイティブワークを革新しています。",
      content: "AI画像生成技術の精度向上により、商用レベルでの利用が現実的になりました。デザイン業務の効率化とコスト削減を同時に実現する技術として注目されています。",
      source: "Creative AI Magazine",
      author: "渡辺健太",
      publishedAt: "2024-12-22",
      readTime: "6分",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop",
      isExternal: true,
      href: "https://example.com/ai-image-generation-commercial",
      tags: ["画像生成", "AI art", "商用利用", "クリエイティブ"],
      category: "デザイン・アート"
    }
  ];

  const categories = [
    t('categories.all') || "すべて",
    t('categories.ai-tech') || "AI技術",
    t('categories.enterprise') || "企業システム",
    t('categories.entertainment') || "エンターテイメント",
    t('categories.business-ai') || "ビジネスAI",
    t('categories.dev-tools') || "開発ツール",
    t('categories.design-art') || "デザイン・アート"
  ];

  // Function to translate category from Japanese to current language
  const translateCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "すべて": t('categories.all') || "すべて",
      "AI技術": t('categories.ai-tech') || "AI技術",
      "企業システム": t('categories.enterprise') || "企業システム",
      "エンターテイメント": t('categories.entertainment') || "エンターテイメント",
      "ビジネスAI": t('categories.business-ai') || "ビジネスAI",
      "開発ツール": t('categories.dev-tools') || "開発ツール",
      "デザイン・アート": t('categories.design-art') || "デザイン・アート"
    };
    return categoryMap[category] || category;
  };

  // Filter articles based on selected category
  const filteredNews = selectedCategory === (t('categories.all') || "すべて") 
    ? allNews 
    : allNews.filter(article => translateCategory(article.category) === selectedCategory);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={newsroomImage}
            alt="Modern newsroom background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-primary/20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200" data-testid="badge-news">
              {t('hero.badge') || "最新ニュース"}
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white" data-testid="text-title">
              {t('hero.title') || "AI・テクノロジーニュース"}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {(t('hero.subtitle') || "生成AI、企業DX、教育技術など\n最新のテクノロジートレンドをお届け").split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-4xl mx-auto">
              {t('hero.description') || "業界の動向から実践的な活用事例まで、技術革新の最前線をわかりやすく解説します。"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map((category, index) => (
              <Button
                key={category}
                onClick={() => handleCategoryClick(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                data-testid={`button-category-${category}`}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredNews.map((article, index) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Card className="h-full hover-elevate group">
                  {/* Article Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {translateCategory(article.category)}
                      </Badge>
                    </div>
                    {article.isExternal && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90 border-orange-200 text-orange-800">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {t('article.external_badge') || "外部記事"}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                      {article.summary}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs border-orange-200 text-orange-700"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Author and Source */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{t('article.by') || "by"} {article.author}</span>
                      <span>{article.source}</span>
                    </div>

                    {/* Read More Button */}
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="w-full group/btn"
                      data-testid={`button-read-${article.id}`}
                    >
                      {article.isExternal ? (
                        <a href={article.href} target="_blank" rel="noopener noreferrer">
                          {t('article.read_article') || "記事を読む"}
                          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link href={article.href}>
                          {t('article.read_article') || "記事を読む"}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}