import ProductCard from '../ProductCard';
import lingaLinkImage from "@assets/generated_images/LingaLink_learning_dashboard_mockup_3e4a3eec.png";

export default function ProductCardExample() {
  return (
    <div className="max-w-sm">
      <ProductCard
        id="lingalink"
        name="LingaLink"
        description="オンラインレッスンでAIが自動レビューを行うコーチングサービス。\nパーソナライズされた学習体験を提供します。"
        image={lingaLinkImage}
        status="released"
        tags={["教育", "AI", "オンライン学習"]}
        href="/products/lingalink"
      />
    </div>
  );
}