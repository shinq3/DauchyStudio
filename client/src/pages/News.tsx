import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  ExternalLink,
  Clock,
  Eye,
  ArrowRight,
  Tag,
  Loader2
} from "lucide-react";
import newsroomImage from '@assets/stock_images/business_technology_ac90df27.jpg';

type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  isExternal: boolean;
  status: string;
};

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
  const { t, i18n } = useTranslation('news');
  
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>(t('categories.all') || "すべて");
  
  // Fetch news from API with current locale
  const { data: allNews = [], isLoading, error } = useQuery<NewsArticle[]>({
    queryKey: ['/api/news', i18n.language],
    queryFn: async () => {
      const locale = i18n.language === 'en' ? 'en' : i18n.language === 'vi' ? 'vi' : 'ja';
      const response = await fetch(`/api/news?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      return response.json();
    }
  });
  
  useEffect(() => {
    document.title = t('meta.title') || "AI・テクノロジーニュース | D'auchy.Studio";
    
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

  // Get unique categories from news data
  const uniqueCategories = Array.from(new Set(allNews.map(article => article.category)));
  const categories = [t('categories.all') || "すべて", ...uniqueCategories];
  
  // Filter articles based on selected category
  const filteredNews = selectedCategory === (t('categories.all') || "すべて") 
    ? allNews 
    : allNews.filter(article => article.category === selectedCategory);

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
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t('error.fetch_failed') || 'ニュースの取得に失敗しました'}</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t('no_news') || 'ニュースがありません'}</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredNews.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Card className="h-full hover-elevate group">
                    {/* Article Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      {article.thumbnail ? (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <Eye className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {article.category}
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
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 3).map((tag, idx) => (
                            <Badge 
                              key={`${article.id}-tag-${idx}`} 
                              variant="outline" 
                              className="text-xs border-orange-200 text-orange-700"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Source */}
                      <div className="text-sm text-muted-foreground mb-4">
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
                        {article.isExternal && article.sourceUrl ? (
                          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                            {t('article.read_article') || "記事を読む"}
                            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        ) : (
                          <Link href={`/news/${article.id}`}>
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
          )}
        </div>
      </section>

    </main>
  );
}