import { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n-utils";

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

// Decode HTML entities that were accidentally escaped by WYSIWYG editor
function decodeIfEscaped(html: string): string {
  if (!html) return '';
  // If content contains escaped HTML tags (e.g. &lt;p&gt;), decode them
  if (/&lt;\w/.test(html)) {
    return html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  return html;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const { locale } = useLocale();
  const [, setLocation] = useLocation();

  // Fetch single news article
  const { data: article, isLoading, error } = useQuery<NewsArticle>({
    queryKey: ['/api/news', id, i18n.language],
    queryFn: async () => {
      const currentLocale = i18n.language === 'en' ? 'en' : i18n.language === 'vi' ? 'vi' : 'ja';
      const response = await fetch(`/api/news?locale=${currentLocale}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const allNews: NewsArticle[] = await response.json();
      const foundArticle = allNews.find(n => n.id === id);
      if (!foundArticle) throw new Error('Article not found');
      return foundArticle;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | D'auchy.Studio`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.summary || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.summary || '';
        document.head.appendChild(meta);
      }
    }
  }, [article]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href={`/${locale}/news`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            asChild
            data-testid="button-back-to-news"
          >
            <Link href={`/${locale}/news`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" data-testid="badge-category">
                {article.category}
              </Badge>
              {article.isExternal && (
                <Badge variant="outline" className="border-orange-200 text-orange-800">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  External Article
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-title">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                Source: {article.source}
              </div>
            </div>

            {article.summary && (
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-summary">
                {article.summary}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {article.thumbnail && (
            <div className="mb-8">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full rounded-lg"
                data-testid="img-featured"
              />
            </div>
          )}

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: decodeIfEscaped(article.content) }}
                data-testid="content-article"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="border-orange-200 text-orange-700"
                    data-testid={`tag-${idx}`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Source Attribution */}
          {article.sourceUrl && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Original Source:
                </p>
                <Button 
                  variant="outline" 
                  asChild
                  data-testid="button-source-url"
                >
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original Article
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  );
}
