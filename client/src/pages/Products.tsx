import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

// TODO: remove mock functionality - replace with real data from API
import lingaLinkImage from "@assets/generated_images/LingaLink_learning_dashboard_mockup_3e4a3eec.png";
import eduMateImage from "@assets/generated_images/EduMate_collaboration_interface_5d5ed6fd.png";
import officeBrainImage from "@assets/generated_images/OfficeBrain_file_system_interface_be3ae664.png";
import baydSystemImage from "@assets/generated_images/Bayd-System_studio_dashboard_36de2e47.png";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // TODO: remove mock functionality - replace with API calls
  const allProducts = [
    {
      id: "lingalink",
      name: "LingaLink",
      description: "オンラインレッスンでAIが自動レビューを行うコーチングサービス。パーソナライズされた学習体験を提供し、効果的なスキルアップをサポートします。",
      image: lingaLinkImage,
      status: "released" as const,
      tags: ["教育", "AI", "オンライン学習", "コーチング"],
      href: "/products/lingalink"
    },
    {
      id: "edumate",
      name: "EduMate",
      description: "友達と一緒に授業の復習や共同勉強を進めて、親へのレポートも作成できるサービスです。協働学習を通じて理解を深めます。",
      image: eduMateImage,
      status: "beta" as const,
      tags: ["教育", "協働学習", "レポート", "学習管理"],
      href: "/products/edumate"
    },
    {
      id: "officebrain",
      name: "OfficeBrain",
      description: "組織内のファイルを共有して権限を管理できるRAGシステム。セキュアな情報共有を実現し、業務効率を向上させます。",
      image: officeBrainImage,
      status: "released" as const,
      tags: ["企業", "RAG", "ファイル管理", "セキュリティ"],
      href: "/products/officebrain"
    },
    {
      id: "bayd-system",
      name: "Bayd-System",
      description: "音楽リハーサルスタジオ管理システム。予約から機材管理まで包括的にサポートし、スタジオ運営を効率化します。",
      image: baydSystemImage,
      status: "coming_soon" as const,
      tags: ["音楽", "スタジオ", "管理システム", "予約管理"],
      href: "/products/bayd-system"
    }
  ];

  const allTags = Array.from(new Set(allProducts.flatMap(product => product.tags)));

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => product.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-orange-600/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-page-title">
              プロダクト一覧
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              D'achy.Studioが開発する革新的なAIプロダクトをご覧ください
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="プロダクトを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">フィルター:</span>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    data-testid={`button-filter-${tag}`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedTags.length > 0 || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedTags([]);
                  setSearchQuery("");
                }}
                data-testid="button-clear-filters"
              >
                フィルターをクリア
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground mb-4">
                条件に一致するプロダクトが見つかりませんでした
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTags([]);
                  setSearchQuery("");
                }}
                data-testid="button-reset-search"
              >
                フィルターをリセット
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-muted-foreground" data-testid="text-results-count">
                  {filteredProducts.length}件のプロダクトが見つかりました
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}