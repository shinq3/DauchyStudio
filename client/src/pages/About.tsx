import { motion } from "framer-motion";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "イノベーション",
      description: "最新のAI技術を活用し、従来の課題を解決する革新的なソリューションを提供します。"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "ユーザー中心",
      description: "ユーザーのニーズを深く理解し、真に価値のある体験を設計・開発します。"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "創造性",
      description: "クリエイティブな思考とテクノロジーを組み合わせ、新しい可能性を切り開きます。"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "持続的成長",
      description: "継続的な学習と改善を通じて、長期的な価値を創造し続けます。"
    }
  ];

  const team = [
    {
      name: "田中 太郎",
      role: "創設者・CEO",
      description: "AI研究歴10年、複数のスタートアップ創業経験を持つエンジニア。",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "佐藤 花子",
      role: "CTO",
      description: "機械学習エンジニアとして大手企業で10年間の開発経験。",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b0e0?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "山田 次郎",
      role: "プロダクトマネージャー",
      description: "教育分野でのプロダクト開発とユーザー体験設計のスペシャリスト。",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-orange-600/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-page-title">
              私たちについて
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-left">
              D'achy.Studioは、AIの力を活用して人々の生活や仕事をより豊かにするプロダクトを開発しています。<br></br>
              私たちは技術と創造性を組み合わせ、真に価値のあるソリューションを提供することを使命としています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-mission-title">
              私たちのミッション
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed text-left">
              私たちは、AIテクノロジーを通じて教育、企業、クリエイティブ分野に革新をもたらします。<br></br>
              ユーザーとの共創を大切にし、実用的で持続可能なソリューションを開発することで、
              社会全体のデジタルトランスフォーメーションに貢献していきます。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-values-title">
              私たちの価値観
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-elevate">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3" data-testid={`text-value-title-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-value-description-${index}`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-team-title">
              チーム
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-600 mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-left">
              多様なバックグラウンドを持つ専門家チームが、革新的なプロダクト開発に取り組んでいます。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover-elevate">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                        data-testid={`img-team-member-${index}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2" data-testid={`text-member-name-${index}`}>
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3" data-testid={`text-member-role-${index}`}>
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-member-description-${index}`}>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" data-testid="text-history-title">
              私たちの歩み
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-milestone-1">
                    2024年1月 - 会社設立
                  </h3>
                  <p className="text-muted-foreground">
                    AI技術の民主化を目指し、D'achy.Studioを設立。教育分野からスタート。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-milestone-2">
                    2024年6月 - LingaLink リリース
                  </h3>
                  <p className="text-muted-foreground">
                    初のプロダクトとなるオンライン学習コーチングサービス「LingaLink」を正式リリース。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-milestone-3">
                    2024年10月 - OfficeBrain リリース
                  </h3>
                  <p className="text-muted-foreground">
                    企業向けRAGシステム「OfficeBrain」をリリース。エンタープライズ市場に参入。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-milestone-4">
                    2024年12月 - 現在
                  </h3>
                  <p className="text-muted-foreground">
                    EduMateベータ版公開、Bayd-System開発中。さらなる革新的プロダクトを準備中。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}