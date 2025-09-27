import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Users,
  BookOpen,
  Upload,
  Brain,
  Bell,
  Share2,
  BarChart3,
  Shield,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  FileText,
  MessageCircle,
  ThumbsUp,
  Lightbulb,
  HelpCircle,
  Eye,
  Lock,
  Smartphone
} from "lucide-react";

export default function Edumate() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: <Upload className="w-8 h-8 text-orange-500" />,
      title: "学習内容の投入（テキスト / ファイル）",
      description: "ノートの写真やPDF、打ち込んだテキストから「勉強の核」を抽出。難しい整形は不要。",
      details: ["ドラッグ＆ドロップ対応", "画像→テキスト抽出", "PDF読み込み"]
    },
    {
      icon: <Brain className="w-8 h-8 text-orange-500" />,
      title: "AIによる変換（要点カード）",
      description: "学習内容を4つの要素で構造化して、理解しやすく変換します。",
      details: [
        "3行要約：授業の芯だけを短く",
        "覚えるべき5ポイント：テストに出る核をリスト化",
        "社会での活用例：学ぶ意味が腹落ちする実例",
        "ミニクイズ：1〜2分で解ける小テスト"
      ]
    },
    {
      icon: <Bell className="w-8 h-8 text-orange-500" />,
      title: "翌日リマインド（1問＋活用例再掲）",
      description: "翌日に1問だけ。短いから必ず続く。活用例の再掲で記憶を「つなぎ直し」。",
      details: ["プッシュ通知", "LINE風バナー通知", "1〜2分で完了"]
    },
    {
      icon: <Share2 className="w-8 h-8 text-orange-500" />,
      title: "共有（ペア間のみ）",
      description: "作った要点カードをワンタップ共有。相手はリアクションや簡単なクイズ回答で参加。",
      details: [
        "👍/💡/質問でリアクション", 
        "ふたりだけの空間", 
        "保護者には中身は見えません"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "学習ログの可視化",
      description: "勉強時間・正答率・連続学習日数を自動記録。",
      details: [
        "カレンダーにスタンプ",
        "連続日数バッジ（7日/30日/100日）",
        "進捗グラフ"
      ]
    },
    {
      icon: <Eye className="w-8 h-8 text-orange-500" />,
      title: "ママログイン（閲覧専用）",
      description: "見えるのは学習時間 / 復習達成率 / 継続日数のみ。やり取りの中身は非表示。",
      details: [
        "数字で見える安心",
        "プライバシー保護",
        "週・月の推移グラフ"
      ]
    }
  ];

  const steps = [
    {
      number: "1",
      title: "インプット",
      description: "授業ノートや配布プリントの要点をコピペ、またはファイルをアップロード",
      icon: <Upload className="w-6 h-6" />
    },
    {
      number: "2", 
      title: "AIがカード化",
      description: "3行要約、覚えるべき5ポイント、社会での活用例、ミニクイズを自動生成",
      icon: <Brain className="w-6 h-6" />
    },
    {
      number: "3",
      title: "翌日リマインド",
      description: "1問＋活用例が通知。サッと解いて定着",
      icon: <Bell className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: "ふたりが別々の教科でも使える？",
      answer: "はい。科目ごとにカード化します。得意・苦手も自動で見える化。"
    },
    {
      question: "クイズはどれくらいの時間？",
      answer: "1〜2分を想定。次の日に「1問だけ」が基本です。"
    },
    {
      question: "保護者は内容まで見られる？", 
      answer: "いいえ。学習時間・復習率・継続日数のみ表示します。"
    },
    {
      question: "テスト前にまとめて復習できる？",
      answer: "できます。単元や日付で要点カードを一括復習できます。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" data-testid="badge-product">
            学習継続支援プラットフォーム
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="text-title">
            Edumate
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              勉強も、恋も、両立できる。
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="text-description">
              ふたりで学んで、ちゃんと続く。保護者にも見える安心設計。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" data-testid="button-free-trial">
              無料で使ってみる
            </Button>
            <Button size="lg" variant="outline" data-testid="button-demo">
              デモを見る
            </Button>
          </div>
        </motion.div>

        {/* What is Edumate Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-12 h-12" />
                <h2 className="text-2xl lg:text-3xl font-bold">Edumateとは？</h2>
              </div>
              <p className="text-lg leading-relaxed mb-6 text-orange-100">
                中高生のペア（例：あなたと彼女/彼氏）が今日の学びをAIで"要点カード"に自動変換。翌日のワンポイント復習と、ふたりだけの共有＆リアクションで学習を"続けやすく"します。
              </p>
              <div className="bg-orange-400/20 rounded-lg p-4">
                <p className="text-orange-100">
                  保護者向けに「学習時間・復習達成率・継続日数」だけを見られる<strong>"ママログイン"</strong>を用意。やり取りの中身は見えません。
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Target Users Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-target-users">
            想定ユーザー
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Users className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">生徒A（息子）</h3>
                <p className="text-gray-600">ペアで使う学習アプリのメインユーザー</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">生徒B（彼女）</h3>
                <p className="text-gray-600">一緒に学習を続けるパートナー</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">保護者（ママログイン）</h3>
                <p className="text-gray-600">学習の「続き具合」だけを確認</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* How to Use Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-how-to-use">
            使い方（3ステップ）
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-elevate h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">{step.number}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="text-orange-500">{step.icon}</div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Card className="bg-gray-50 inline-block">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  <strong>UI例：</strong> [＋新しい学び] [ファイルを追加] [ペアに共有] [明日のリマインドON]
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Features Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-main-features">
            主要機能
          </h2>
          <div className="grid gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                      <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                          {feature.icon}
                          <h3 className="text-lg font-semibold">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {feature.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problems Solved Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-problems-solved">
            こんな課題を解決します
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="font-semibold mb-2">続かない問題</h3>
                <p className="text-gray-600 text-sm">翌日1問の「超ミニ復習」で、やるハードルを極小化</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <Lightbulb className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="font-semibold mb-2">意味が見えない問題</h3>
                <p className="text-gray-600 text-sm">活用例で「学ぶ理由」を可視化</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="font-semibold mb-2">保護者の不安</h3>
                <p className="text-gray-600 text-sm">「本当に勉強してるの？」→数字で見える安心（中身は非公開）</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Safety & Privacy Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-safety-privacy">
            安全・プライバシー
          </h2>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">限定共有</h3>
                  <p className="text-sm text-gray-600">ペア共有は当人どうし限定。保護者に見えるのは数値サマリのみ</p>
                </div>
                <div>
                  <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">プライバシー保護</h3>
                  <p className="text-sm text-gray-600">学校・学年名などの個人情報は入力不要（任意）</p>
                </div>
                <div>
                  <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">データ管理</h3>
                  <p className="text-sm text-gray-600">データは暗号化保存。退会時のデータ削除に対応</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-faq">
            よくある質問
          </h2>
          <div className="grid gap-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-12">
              <Heart className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">
                ふたりで始める、新しい学習スタイル
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                勉強も恋愛も両立できる、安心の学習プラットフォームを体験してみませんか？
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-orange-600 border-white hover:bg-orange-50"
                  data-testid="button-cta-free-trial"
                >
                  無料で使ってみる
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                  data-testid="button-cta-demo"
                >
                  デモを見る
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}