import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building,
  Users,
  Shield,
  MessageSquare,
  FileText,
  Search,
  BarChart3,
  Settings,
  CheckCircle,
  Globe,
  Brain,
  Lock,
  Bot,
  Zap,
  Calendar,
  UserCheck,
  FileCheck,
  Monitor,
  Target,
  Workflow,
  BookOpen,
  Newspaper,
  Video,
  Languages,
  TrendingUp,
  Key
} from "lucide-react";
import enterpriseProjectImage from '@assets/stock_images/enterprise_project_m_feeadfd1.jpg';

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

export default function EnterpriseLLM() {
  useEffect(() => {
    document.title = "Enterprise LLM - 統合型企業プラットフォーム | D'achy.Studio";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Enterprise LLM - プロジェクト管理・ナレッジ共有・AIアシスタントを統合したオールインワン企業プラットフォーム。チームの力を最大限に引き出す統合型ソリューション。');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Enterprise LLM - プロジェクト管理・ナレッジ共有・AIアシスタントを統合したオールインワン企業プラットフォーム。チームの力を最大限に引き出す統合型ソリューション。';
      document.head.appendChild(meta);
    }
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "認証・アカウント管理",
      description: "セキュアな認証環境でユーザー情報を安全に管理",
      details: [
        "多要素認証（MFA）対応でセキュリティ強化",
        "ユーザープロフィール完全管理（名前・部署・写真）",
        "日本語・英語・ベトナム語の多言語UI対応"
      ]
    },
    {
      icon: <Building className="w-8 h-8 text-orange-500" />,
      title: "組織管理",
      description: "会社情報からプラン管理まで一元化",
      details: [
        "会社情報・所在地・連絡先の統合管理",
        "BasicからEnterpriseまでの柔軟プラン対応",
        "管理者・メンバー権限のスムーズ設定"
      ]
    },
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "プロジェクト管理",
      description: "AI予測機能付きの高度なプロジェクト管理",
      details: [
        "進捗率・優先度・メンバーの直感的操作",
        "マイルストーン管理で重要な節目を見える化",
        "リスク管理と将来予測でプロジェクト成功率向上"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "タスク管理",
      description: "AI提案機能付きかんばんボードでタスクを効率化",
      details: [
        "ドラッグ&ドロップのかんばんボード",
        "サブタスク機能で大きな仕事を細分化",
        "AI提案でプロジェクト状況に応じた新タスク提案"
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
      title: "チャット・コミュニケーション",
      description: "多言語対応のリアルタイムコミュニケーション",
      details: [
        "1対1・グループチャットでリアルタイム会話",
        "@メンション機能と自動翻訳対応",
        "過去の会話履歴を素早く検索"
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
      title: "ナレッジベース",
      description: "AI検索機能付きの社内Wiki環境",
      details: [
        "記事作成・タグ分類・履歴管理",
        "リッチエディタで読みやすい記事作成",
        "AI検索で関連ドキュメントを自動提示"
      ]
    },
    {
      icon: <Newspaper className="w-8 h-8 text-orange-500" />,
      title: "ニュース統合",
      description: "業界ニュースとプロジェクト関連情報の自動収集",
      details: [
        "ビジネス・テック分野の最新ニュース配信",
        "進行中プロジェクトに関連するニュース自動収集",
        "重要情報のアラート通知機能"
      ]
    },
    {
      icon: <Video className="w-8 h-8 text-orange-500" />,
      title: "会議・議事録",
      description: "AI要約機能付きの会議管理システム",
      details: [
        "会議スケジュール・参加者・URL管理",
        "AI要約で会議内容を自動まとめ",
        "議事録の多言語翻訳機能"
      ]
    },
    {
      icon: <Search className="w-8 h-8 text-orange-500" />,
      title: "検索・問い合わせ",
      description: "AI搭載の横断検索で情報を瞬時に発見",
      details: [
        "プロジェクト・タスク・ナレッジの一括検索",
        "言葉の意味を理解するAI検索",
        "社内Q&A履歴の一元管理"
      ]
    },
    {
      icon: <Bot className="w-8 h-8 text-orange-500" />,
      title: "AIアシスタント",
      description: "OpenAI & Gemini対応の高度なAI支援",
      details: [
        "用途に合わせてOpenAI・Geminiを切り替え",
        "自動要約・翻訳・感情分析で業務効率化",
        "RAG検索で社内データを活用した精度の高い回答"
      ]
    },
    {
      icon: <Languages className="w-8 h-8 text-orange-500" />,
      title: "多言語対応",
      description: "国際チーム向けの完全多言語対応",
      details: [
        "日本語・英語・ベトナム語に完全対応",
        "チャット自動翻訳で国際チームも安心",
        "タイムゾーン・通貨対応で海外拠点連携"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "ダッシュボード・分析",
      description: "進捗とパフォーマンスの可視化分析",
      details: [
        "プロジェクト・タスク状況のグラフ化",
        "メンバーごとのパフォーマンス把握",
        "カスタムレポートのExcel・PDF出力"
      ]
    }
  ];

  const systemFeatures = [
    {
      icon: <Settings className="w-6 h-6 text-orange-500" />,
      title: "権限管理",
      description: "きめ細かいアクセスコントロール"
    },
    {
      icon: <Monitor className="w-6 h-6 text-orange-500" />,
      title: "監査ログ",
      description: "すべての操作履歴を追跡"
    },
    {
      icon: <Key className="w-6 h-6 text-orange-500" />,
      title: "AI利用管理",
      description: "APIキーや使用量を一括管理"
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      title: "データ保護",
      description: "暗号化と定期バックアップ"
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "¥9,800",
      period: "月額 / 5ユーザー",
      features: [
        "基本的なプロジェクト管理",
        "タスク管理",
        "チャット機能",
        "基本的なナレッジベース",
        "メール・チャットサポート"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "¥19,800",
      period: "月額 / 15ユーザー",
      features: [
        "Basicの全機能",
        "AI検索・要約機能",
        "会議管理・議事録AI要約",
        "ニュース統合",
        "多言語翻訳",
        "電話・Zoom・チャットサポート"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "お問い合わせ",
      period: "カスタム価格",
      features: [
        "Professionalの全機能",
        "カスタムAIモデル統合",
        "専用サーバー・VPN接続",
        "カスタム権限設定",
        "専任カスタマーサクセス",
        "オンサイト導入支援"
      ],
      recommended: false
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={enterpriseProjectImage}
            alt="Enterprise project management background"
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
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200" data-testid="badge-status">
              統合型プラットフォーム
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white" data-testid="text-title">
              Enterprise LLM
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              プロジェクト管理 × ナレッジ共有 × AIアシスタント<br />
              企業の仕事をもっとスマートにする、統合型プラットフォーム
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-4xl mx-auto">
              このシステムは、プロジェクト管理・コミュニケーション・ナレッジ共有・AI支援をひとつにまとめたオールインワン環境です。<br />
              日常の業務から大規模プロジェクトまで、チームの力を最大限に引き出します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button asChild size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-demo">
                <Link href="/contact">
                  デモを予約
                </Link>
              </Button> */}
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10" data-testid="button-more-info">
                <Link href="/contact">
                  詳細を問い合わせ
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-features-title">
              オールインワン機能で業務を効率化
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              プロジェクト管理からAIアシスタントまで、企業が必要とするすべての機能を統合。
              チームの生産性を最大化します。
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {feature.icon}
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* System Management */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              企業レベルのシステム管理
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              セキュリティとガバナンスを最優先に設計された管理機能
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {systemFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full hover-elevate">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing - Hidden as requested */}
      {/* 
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-pricing-title">
              チームサイズに合わせた柔軟なプラン
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              スタートアップから大企業まで、規模に応じて最適なプランをご用意
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`h-full relative ${plan.recommended ? 'border-primary shadow-lg' : ''} hover-elevate`}>
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">おすすめ</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full mt-6 ${plan.recommended ? 'bg-primary hover:bg-primary/90' : 'variant-outline'}`}
                      data-testid={`button-plan-${plan.name.toLowerCase()}`}
                    >
                      <Link href="/contact">
                        {plan.name === "Enterprise" ? "お問い合わせ" : "プランを選択"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-orange-600/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              チームの可能性を最大化しませんか？
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enterprise LLMで、プロジェクト管理から AI活用まで、すべてを統合。
              企業の生産性を最大化する統合プラットフォームをご体験ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-contact">
                <Link href="/contact">
                  お問い合わせ
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="lg" data-testid="button-demo-schedule">
                <Link href="/contact">
                  デモンストレーション予約
                </Link>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}