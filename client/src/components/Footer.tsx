import { Link } from "wouter";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  company: string;
  address: string;
  links: Array<{
    title: string;
    items: Array<{ name: string; href: string }>;
  }>;
  social: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

export default function Footer({ company, address, links, social }: FooterProps) {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-bold text-xl text-white">{company}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              AIプロダクトの開発・提供を通じて、
              未来のテクノロジーソリューションを創造します。
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span data-testid="text-address">{address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span data-testid="text-email">contact@dachy.studio</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span data-testid="text-phone">+81-3-1234-5678</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-white" data-testid={`text-footer-section-${index}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                      data-testid={`link-footer-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">フォローする</h4>
            <div className="flex space-x-4">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-gray-300"
                  data-testid={`link-social-${item.name.toLowerCase()}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                最新情報をお届けします
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-newsletter"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors" data-testid="button-newsletter">
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-300" data-testid="text-copyright">
            © 2024 {company}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors" data-testid="link-privacy">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors" data-testid="link-terms">
              利用規約
            </Link>
            <Link href="/sitemap" className="text-gray-300 hover:text-primary transition-colors" data-testid="link-sitemap">
              サイトマップ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}