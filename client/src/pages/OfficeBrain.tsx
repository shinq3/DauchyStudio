import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  Image,
  BarChart3,
  Settings,
  CheckCircle,
  Globe,
  Brain,
  Lock,
  Upload,
  Bot,
  Zap,
  Eye,
  UserCheck,
  FileCheck,
  Monitor
} from "lucide-react";
import modernOfficeImage from '@assets/stock_images/modern_office_meetin_f1d8354c.jpg';

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

export default function OfficeBrain() {
  const { t } = useTranslation('officebrain');
  
  useEffect(() => {
    document.title = t('meta.title');
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('meta.description');
      document.head.appendChild(meta);
    }
  }, [t]);
  const features = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "ユーザー管理と安全性",
      description: "社員ごとのアカウント管理、部署・役職別アクセス制御、プロフィール編集機能。",
      details: [
        "社員ごとの個別アカウント作成",
        "部署・役職による権限管理", 
        "安全なパスワード変更機能",
        "プロフィール情報の管理"
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
      title: "マルチAIチャット",
      description: "ChatGPT、Google Geminiなど複数のAIを選択可能。履歴保存・検索機能付き。",
      details: [
        "複数AIエンジンから選択",
        "会話履歴の自動保存・検索",
        "日本語・英語・ベトナム語対応",
        "リアルタイム応答"
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "セキュアファイル管理",
      description: "PDF、Word、Excel、画像を50MBまでアップロード。承認フロー付きで安心共有。",
      details: [
        "多様なファイル形式に対応",
        "部署・全社・個人の公開範囲設定",
        "承認フローによる安全な共有",
        "最大50MBまでのアップロード"
      ]
    },
    {
      icon: <Search className="w-8 h-8 text-orange-500" />,
      title: "AIによる意味検索（RAG）",
      description: "キーワードではなく「意味」で文書を検索。参照資料も一緒に表示される高度検索。",
      details: [
        "意味ベースのインテリジェント検索",
        "関連資料の自動表示",
        "大量データからの情報抽出",
        "チャット形式での結果取得"
      ]
    },
    {
      icon: <Image className="w-8 h-8 text-orange-500" />,
      title: "AI画像生成",
      description: "指示に基づいてAIがイラストや図解を自動生成。プレゼン資料作成に最適。",
      details: [
        "テキストからの画像生成",
        "プレゼン用図解作成",
        "マニュアル用イラスト生成",
        "多様なスタイル対応"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "利用状況アナリティクス",
      description: "社員・部署・全社単位でAI利用量を把握。リアルタイムモニタリングでコスト管理。",
      details: [
        "個人・部署別利用統計",
        "リアルタイム使用量モニタリング",
        "コスト管理とアラート",
        "詳細なレポート機能"
      ]
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: "システム管理",
      description: "ベクトル検索設定の調整、一括処理、全体設定を管理者がコントロール。",
      details: [
        "ベクトル検索エンジン設定",
        "バッチ処理とスケジューリング",
        "システム全体の設定管理",
        "パフォーマンス最適化"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "承認・通知システム",
      description: "ファイル共有には承認フローがあり、通知機能で円滑なワークフローを実現。",
      details: [
        "多段階承認ワークフロー",
        "リアルタイム通知システム",
        "承認待ち一覧の管理",
        "自動エスカレーション機能"
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "多言語・マルチデバイス対応",
      description: "日英越3言語対応、スマホ・タブレット・PCで同一操作感、ダークモードも搭載。",
      details: [
        "日本語・英語・ベトナム語対応",
        "レスポンシブデザイン",
        "ダークモード切り替え",
        "クロスプラットフォーム対応"
      ]
    }
  ];

  const steps = [
    {
      number: "1",
      title: "ユーザー登録・ログイン",
      description: "管理者が社員アカウントを作成、各社員が安全にログイン",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      number: "2", 
      title: "AIチャット・ファイル活用",
      description: "複数AIと対話、社内資料をアップロードして意味検索で活用",
      icon: <Bot className="w-6 h-6" />
    },
    {
      number: "3",
      title: "承認・共有・分析",
      description: "承認フローでファイル共有、利用状況を分析してコスト最適化",
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-orange-500" />,
      title: "企業レベルのセキュリティ",
      description: "部署別アクセス制御と承認フローで機密情報を安全に管理"
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      title: "業務効率の大幅改善",
      description: "AIチャット、意味検索、画像生成で日々の業務を効率化"
    },
    {
      icon: <Eye className="w-12 h-12 text-orange-500" />,
      title: "透明性のある運用",
      description: "利用状況の見える化でコスト管理と適切な利用を促進"
    }
  ];

  const useCases = [
    {
      title: "営業部門",
      description: "顧客提案資料の作成、競合分析、プレゼン用画像生成",
      icon: <Building className="w-8 h-8 text-orange-500" />
    },
    {
      title: "人事部門", 
      description: "社内規程の検索、研修資料作成、従業員サポート",
      icon: <Users className="w-8 h-8 text-orange-500" />
    },
    {
      title: "開発部門",
      description: "技術文書の検索、コードレビュー支援、仕様書作成",
      icon: <Monitor className="w-8 h-8 text-orange-500" />
    }
  ];

  const faqs = [
    {
      question: "どのようなファイル形式に対応していますか？",
      answer: "PDF、Word、Excel、PowerPoint、画像ファイル（JPG、PNG）など主要な形式に対応。最大50MBまでアップロード可能です。"
    },
    {
      question: "承認フローはカスタマイズできますか？",
      answer: "はい。部署や情報の機密度に応じて、承認者や承認段階を柔軟に設定できます。"
    },
    {
      question: "利用量の制限はありますか？", 
      answer: "企業プランに応じて月間利用量を設定。リアルタイムで使用状況を監視し、上限に近づくとアラートで通知します。"
    },
    {
      question: "既存のシステムとの連携は可能ですか？",
      answer: "API経由で既存の人事システムやファイルサーバーとの連携が可能です。詳細は営業担当にお問い合わせください。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section with Background Image */}
      <section className="py-16 lg:py-24 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={modernOfficeImage}
            alt="Modern office meeting background"
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" data-testid="badge-product">
            {t('hero.badge')}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="text-title">
            {t('hero.mainTitle')}
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              {t('hero.tagline')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="text-description">
              {t('hero.description')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" data-testid="button-contact">
              <Link href="/contact">{t('hero.buttons.contact')}</Link>
            </Button>
            {/* <Button asChild size="lg" variant="outline" data-testid="button-demo">
              <Link href="/contact">デモを見る</Link>
            </Button> */}
          </div>
        </motion.div>

        {/* What is Office Brain Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-12 h-12" />
                <h2 className="text-2xl lg:text-3xl font-bold">{t('whatIs.title')}</h2>
              </div>
              <p className="text-lg leading-relaxed mb-6 text-orange-100">
                {t('whatIs.description')}
              </p>
              <div className="bg-orange-400/20 rounded-lg p-4">
                <p className="font-semibold text-orange-100">
                  {t('whatIs.note')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12">{t('benefits.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full text-center hover-elevate">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Use Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12">使い方（3ステップ）</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      {step.icon}
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12">主要機能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12">活用シーン</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-elevate">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Q. {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      A. {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-12">
              <Brain className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">
                あなたの会社の「頭脳」を進化させませんか？
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Office Brainで、AIを活用した新しい働き方を体験してください。セキュリティも業務効率も、両方手に入れる企業向けAIプラットフォームです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" data-testid="button-contact-officebrain">
                  <Link href="/contact">お問い合わせ</Link>
                </Button>
                {/* <Button asChild size="lg" variant="outline" data-testid="button-trial-cta">
                  <Link href="/contact">無料トライアル</Link>
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}