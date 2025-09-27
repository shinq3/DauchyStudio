import NewsCard from '../NewsCard';

export default function NewsCardExample() {
  return (
    <div className="max-w-sm">
      <NewsCard
        id="ai-news-1"
        title="生成AIの教育分野への応用が急速に拡大"
        summary="OpenAIのGPT-4やGoogle Bardなどの大規模言語モデルが教育現場で活用され、個別指導やカリキュラム作成の効率化が進んでいます。"
        source="AI News Japan"
        publishedAt="2024-12-27"
        thumbnail="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
        isExternal={true}
        href="https://example.com/ai-education-news"
      />
    </div>
  );
}