import Footer from '../Footer';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function FooterExample() {
  const links = [
    {
      title: "プロダクト",
      items: [
        { name: "LingaLink", href: "/products/lingalink" },
        { name: "EduMate", href: "/products/edumate" },
        { name: "OfficeBrain", href: "/products/officebrain" },
        { name: "Bayd-System", href: "/products/bayd-system" }
      ]
    },
    {
      title: "会社情報",
      items: [
        { name: "私たちについて", href: "/about" },
        { name: "ニュース", href: "/news" },
        { name: "キャリア", href: "/careers" },
        { name: "お問い合わせ", href: "/contact" }
      ]
    }
  ];

  const social = [
    { name: "GitHub", href: "https://github.com/dachy-studio", icon: <Github className="w-4 h-4" /> },
    { name: "Twitter", href: "https://twitter.com/dachy_studio", icon: <Twitter className="w-4 h-4" /> },
    { name: "LinkedIn", href: "https://linkedin.com/company/dachy-studio", icon: <Linkedin className="w-4 h-4" /> },
    { name: "Email", href: "mailto:contact@dachy.studio", icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <Footer
      company="D'achy.Studio"
      address="千葉県船橋市上山町3-531-9"
      links={links}
      social={social}
    />
  );
}