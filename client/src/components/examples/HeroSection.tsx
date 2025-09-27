import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      title="D'achy.Studio"
      subtitle="AIの力で未来を創造する。革新的なプロダクトとソリューションを通じて、テクノロジーの可能性を実現します。"
      primaryCta={{ label: "プロダクトを見る", href: "/products" }}
      secondaryCta={{ label: "詳しく知る", href: "/about" }}
    />
  );
}