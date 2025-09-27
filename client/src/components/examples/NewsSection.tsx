import NewsSection from '../NewsSection';

export default function NewsSectionExample() {
  const newsItems = [
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

  return (
    <NewsSection
      title="最新AIニュース"
      items={newsItems}
      ctaHref="/news"
    />
  );
}