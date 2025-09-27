import CTASection from '../CTASection';
import { Mail, MessageCircle } from 'lucide-react';

export default function CTASectionExample() {
  const actions = [
    {
      label: "無料相談を予約",
      href: "/contact",
      variant: "secondary" as const,
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: "ニュースレター登録",
      href: "/newsletter",
      variant: "outline" as const,
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <CTASection
      title="AIの可能性を一緒に探求しませんか？"
      actions={actions}
    />
  );
}