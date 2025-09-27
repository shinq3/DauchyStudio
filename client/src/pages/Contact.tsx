import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import customerServiceImage from "@assets/stock_images/professional_custome_9f6415d1.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: remove mock functionality - integrate with actual contact form API
    console.log("Form submitted:", formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "お問い合わせを受け付けました",
      description: "24時間以内にご連絡いたします。",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      inquiryType: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "メール",
      value: "contact@dachy.studio",
      link: "mailto:contact@dachy.studio"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "電話",
      value: "+81-3-1234-5678",
      link: "tel:+81-3-1234-5678"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "住所",
      value: "東京都渋谷区恵比寿1-1-1",
      link: null
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "営業時間",
      value: "平日 9:00-18:00",
      link: null
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={customerServiceImage}
            alt="Customer service background"
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" data-testid="text-page-title">
              お問い合わせ
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              プロダクトに関するご質問や導入のご相談など、お気軽にお問い合わせください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    お問い合わせフォーム
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">お名前 *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">会社名・組織名</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        data-testid="input-company"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiry-type">お問い合わせの種類 *</Label>
                      <Select 
                        required 
                        value={formData.inquiryType} 
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <SelectTrigger data-testid="select-inquiry-type">
                          <SelectValue placeholder="お問い合わせの種類を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-inquiry">プロダクトに関するお問い合わせ</SelectItem>
                          <SelectItem value="demo-request">デモのご依頼</SelectItem>
                          <SelectItem value="pricing">料金に関するお問い合わせ</SelectItem>
                          <SelectItem value="partnership">パートナーシップ</SelectItem>
                          <SelectItem value="support">サポート</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">メッセージ *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="詳細なご質問やご要望をお書きください"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        data-testid="textarea-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "送信中..." : "送信する"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6" data-testid="text-contact-info-title">
                  お問い合わせ先
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium mb-1" data-testid={`text-contact-label-${index}`}>
                          {info.label}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            data-testid={`link-contact-${index}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground" data-testid={`text-contact-value-${index}`}>
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    レスポンス時間
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    通常、24時間以内にご返信いたします。緊急のお問い合わせの場合は、お電話でご連絡ください。
                  </p>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">関連リンク</h3>
                  <div className="space-y-2">
                    <a
                      href="/products"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-products"
                    >
                      → プロダクト一覧
                    </a>
                    <a
                      href="/about"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-about"
                    >
                      → 会社概要
                    </a>
                    <a
                      href="/news"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-news"
                    >
                      → 最新ニュース
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}