import ProductGrid from '../ProductGrid';
import lingaLinkImage from "@assets/generated_images/LingaLink_learning_dashboard_mockup_3e4a3eec.png";
import eduMateImage from "@assets/generated_images/EduMate_collaboration_interface_5d5ed6fd.png";
import officeBrainImage from "@assets/generated_images/OfficeBrain_file_system_interface_be3ae664.png";
import baydSystemImage from "@assets/generated_images/Bayd-System_studio_dashboard_36de2e47.png";

export default function ProductGridExample() {
  const products = [
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
      id: "bayd-system",
      name: "Bayd-System",
      description: "音楽リハーサルスタジオ管理システム。予約から機材管理まで包括的にサポートします。",
      image: baydSystemImage,
      status: "coming_soon" as const,
      tags: ["音楽", "スタジオ", "管理システム"],
      href: "/products/bayd-system"
    }
  ];

  return (
    <ProductGrid
      title="革新的なAIプロダクト"
      products={products}
      ctaHref="/products"
    />
  );
}