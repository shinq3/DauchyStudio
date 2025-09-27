import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar, 
  Video, 
  Share2, 
  Brain, 
  FileText, 
  Clock, 
  Globe, 
  Mic, 
  MessageSquare,
  Sparkles,
  CheckCircle
} from "lucide-react";
import heroImage from "@assets/image_1758941074318.png";

export default function LingaLink() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" data-testid="badge-product">
                AI学習プラットフォーム
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="text-title">
                LingaLink
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8" data-testid="text-description">
                学ぶ・教えるの効率をAIがサポートするオンライン学習プラットフォーム
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600" data-testid="button-hero-demo">
                  無料デモを試す
                </Button>
                <Button size="lg" variant="outline" data-testid="button-hero-learn-more">
                  詳しく見る
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl" data-testid="img-hero">
                <img 
                  src={heroImage} 
                  alt="LingaLink - 英語でつながる、新しい毎日へ" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
              {/* Floating elements for visual enhancement */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-pulse delay-700" />
            </div>
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <GraduationCap className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">学生向け</h3>
                  <p className="text-orange-100">授業に集中すれば、あとでAIが要点を整理してくれる</p>
                </div>
                <div>
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">講師向け</h3>
                  <p className="text-orange-100">ニュースや記事からAIが教材作りを手伝ってくれる</p>
                </div>
                <div>
                  <Sparkles className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI支援</h3>
                  <p className="text-orange-100">学習と教育の両方を効率化する革新的なツール</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Features */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-student-features">
            🎯 学生が使える機能
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-500" />
                  <CardTitle>レッスン予約・参加</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">好きな先生のスケジュールを確認して、ワンタップで予約</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">ビデオ通話や画面共有でオンライン授業を受けられる</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-orange-500" />
                  <CardTitle>AIによる自動まとめ</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">レッスンが終わると、AIが授業内容を自動で要約</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">要点をまとめた「復習レビュー」が自動生成され、効率よく復習できる</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-orange-500" />
                  <CardTitle>学習記録の保存</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">過去のレッスン内容・要約・レビューをいつでも見返せる</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mic className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">音声は自動で文字起こしされるので、聞き逃しゼロ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                  <CardTitle>共同作業ツール</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">レッスン中にホワイトボード感覚で書いたり描いたりできる</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">学生と先生が同時に操作できて、そのまま保存される</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Teacher Features */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-teacher-features">
            👩‍🏫 講師が使える機能
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-500" />
                  <CardTitle>スケジュール管理</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">自分の空き時間を登録して、生徒がそこから予約</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-orange-500" />
                  <CardTitle>オリジナル教材の作成（AIサポート）</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">ニュース記事を検索して教材に変換</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">内容を要約し、イラストもAIで生成してオリジナル教材をすぐ作れる</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-orange-500" />
                  <CardTitle>教材の保存・編集</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">作った教材を一覧で管理、修正・更新も可能</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">難易度をレベル別に設定して、生徒に合わせられる</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Common Features */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" data-testid="text-common-features">
            🤝 共通の便利機能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">多言語対応</h3>
                <p className="text-gray-600 text-sm">日本語・英語を切り替えて使える</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Video className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">高品質なビデオ通話</h3>
                <p className="text-gray-600 text-sm">安定した接続で映像・音声のやりとり</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Share2 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">スクリーン共有・録音</h3>
                <p className="text-gray-600 text-sm">授業を画面付きで共有でき、録音も自動保存</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">復習リマインド</h3>
                <p className="text-gray-600 text-sm">後から要約やレビューを元に学習し直せる</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">
                LingaLinkで始める新しい学習体験
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                AIが支援する効率的な学習と教育を体験してみませんか？
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-orange-600 border-white hover:bg-orange-50"
                  data-testid="button-demo"
                >
                  無料デモを試す
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                  data-testid="button-contact"
                >
                  お問い合わせ
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}