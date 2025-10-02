import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  Brain, 
  Lightbulb, 
  Users, 
  Target,
  MessageSquare,
  Mic,
  FileText,
  Video,
  Image as ImageIcon,
  Wifi,
  Search,
  FileSearch,
  Database,
  CheckCircle,
  Sparkles
} from "lucide-react";
import aiHeroImage from '@assets/stock_images/business_casual_prof_fffc533f.jpg';

export default function AIProposal() {
  const { t } = useTranslation('ai-proposal');
  
  useEffect(() => {
    document.title = "AIのご提案 | D'auchy.Studio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AIは、あなたの知識と経験を最大化するパートナー。人間中心のシステム構築をサポートします。');
    }
  }, []);

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

  const uiExamples = [
    { icon: <MessageSquare className="w-5 h-5" />, text: "チャットでの問い合わせ：自然な言葉で質問すれば即回答" },
    { icon: <Mic className="w-5 h-5" />, text: "音声認識：会議や現場の会話を自動で議事録化" },
    { icon: <FileText className="w-5 h-5" />, text: "手書き文字のキャプチャ：ノートやホワイトボードを撮影してデータ化" },
    { icon: <Video className="w-5 h-5" />, text: "動画での状況把握：現場映像から異常検知や改善提案" },
    { icon: <ImageIcon className="w-5 h-5" />, text: "画像での指示：写真をアップロードして必要な対応を提示" },
    { icon: <Wifi className="w-5 h-5" />, text: "センサー連動：IoTデータと人の感覚を組み合わせて分析" },
  ];

  const ragExamples = [
    { icon: <Search className="w-5 h-5" />, text: "よく使う用語の辞書化：社内独自の専門用語を正確に理解" },
    { icon: <Lightbulb className="w-5 h-5" />, text: "提案時のナレッジ活用：過去事例やノウハウを呼び出して資料に反映" },
    { icon: <Database className="w-5 h-5" />, text: "実績データからの統計分析：検索とAI生成を組み合わせて迅速に分析" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "FAQの自動回答：よくある社内質問に即座に対応" },
    { icon: <FileSearch className="w-5 h-5" />, text: "規程・マニュアルの参照：文脈に沿った説明で業務をサポート" },
    { icon: <FileText className="w-5 h-5" />, text: "議事録検索：過去の会議内容を検索し、課題解決に応用" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section with Background Image */}
      <section className="py-16 lg:py-24 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={aiHeroImage}
            alt="AI collaboration background"
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
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-base px-4 py-1" data-testid="badge-ai">
              AI活用のご提案
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" data-testid="text-hero-title">
              AIは、あなたの知識と経験を<br />最大化するパートナー
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              AIを導入すること自体がゴールではありません。<br />
              大切なのは、あなたや組織に蓄積された知識や経験を活かすことです。
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
        {/* Section 1: 発想の転換 */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">発想の転換：AIは目的ではない</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                AIを導入すること自体がゴールではありません。<br />
                大切なのは、<strong className="text-orange-600">あなたや組織に蓄積された知識や経験</strong>を活かし、<br />
                <strong className="text-orange-600">人の感覚に寄り添った仕組み</strong>をつくることです。
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">客観データ</h3>
                    </div>
                    <p className="text-blue-800">数値、実績、事実</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">主観データ</h3>
                    </div>
                    <p className="text-purple-800">便利さ、心地よさ、体験</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                両方を取り込み、より人間中心のシステムを目指します。
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 2: UI/UXの固定観念を超える */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-10 h-10 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">UI/UXの固定観念を超える</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                従来の「キーボード入力」「タップやスワイプ」といった決まりきった操作は、<br />
                人間の自然な感覚を制限してきました。
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                AIによって、<strong className="text-orange-600">直感的で多様な入力方法</strong>が可能になります。
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-6">事例</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {uiExamples.map((example, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 hover-elevate">
                    <div className="text-orange-500 mt-0.5 flex-shrink-0">
                      {example.icon}
                    </div>
                    <p className="text-gray-700">{example.text}</p>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <p className="text-lg font-semibold">
                    「どう操作するか」ではなく「どう感じ、どう問いかけるか」を基準にした新しいインターフェースが広がります。
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 3: RAGによる社内知識の活用 */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-10 h-10 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">RAGによる社内知識の活用</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                AIに社内データを直接流し込むのではなく、<br />
                <strong className="text-orange-600">社内に蓄積された知識や経験を検索して回答を導く</strong> ことが重要です。
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                これを実現するのが <strong className="text-orange-600">RAG（Retrieval-Augmented Generation）</strong>。<br />
                一般論ではなく、<strong className="text-orange-600">自社独自の知識に基づく具体的な解決策</strong>を引き出せます。
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-6">事例</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {ragExamples.map((example, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 hover-elevate">
                    <div className="text-blue-600 mt-0.5 flex-shrink-0">
                      {example.icon}
                    </div>
                    <p className="text-gray-700">{example.text}</p>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 mb-2">
                        さらにRAGは、LLMの課題である <strong className="text-blue-900">「ハルシネーション（事実に基づかない出力）」</strong> を防ぎます。
                      </p>
                      <p className="text-gray-800">
                        検証済みの知識ソースを活用することで、正確かつ信頼性の高い情報を提供できます。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 4: 結論 */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
            <CardContent className="p-8 lg:p-12 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-10 h-10 text-white" />
                <h2 className="text-3xl font-bold">結論：AIはツールではなく橋渡し役</h2>
              </div>
              
              <p className="text-xl leading-relaxed mb-8 text-orange-50">
                AIを導入する本当の意味は、<br />
                <strong className="text-white">「独自の知識と経験を最大限に生かし、人間中心の仕組みを再構築すること」</strong> にあります。
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                  <p className="text-lg text-orange-50">効率化と心地よさを両立</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                  <p className="text-lg text-orange-50">社員や顧客に寄り添った新しい業務システムを実現</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                  <p className="text-lg text-orange-50">AIは、そのための <strong className="text-white">"パートナー"</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
