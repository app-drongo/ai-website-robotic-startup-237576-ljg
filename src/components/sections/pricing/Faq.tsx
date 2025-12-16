'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our pricing and plans',
  contactText: 'Still have questions?',
  contactDescription: "Can't find the answer you're looking for? Please chat to our friendly team.",
  contactButtonText: 'Get in touch',
  contactHref: '/contact',
  faqs: [
    {
      question: "What's included in the free plan?",
      answer:
        'Our free plan includes up to 3 projects, 5GB storage, basic analytics, and community support. Perfect for getting started with your tech projects.',
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer:
        'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle. No hidden fees or penalties.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund within the first 30 days.",
    },
    {
      question: 'Is there a setup fee?',
      answer:
        'No setup fees, ever. You only pay for your chosen plan. We believe in transparent pricing with no hidden costs or surprise charges.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  const handleContactClick = () => {
    navigate(config.contactHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {config.faqs.map((faq, idx) => (
            <Card key={idx} className="bg-card text-card-foreground border-border">
              <Collapsible open={openItems.includes(idx)} onOpenChange={() => toggleItem(idx)}>
                <CollapsibleTrigger asChild>
                  <button className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg">
                    <h3 className="text-lg font-semibold pr-4">
                      <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        openItems.includes(idx) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="bg-muted text-muted-foreground">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <MessageCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              <span data-editable="contactText">{config.contactText}</span>
            </h3>
            <p className="mb-6 max-w-md mx-auto">
              <span data-editable="contactDescription">{config.contactDescription}</span>
            </p>
            <Button
              onClick={handleContactClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="contactHref"
              data-href={config.contactHref}
            >
              <Mail className="h-4 w-4 mr-2" />
              <span data-editable="contactButtonText">{config.contactButtonText}</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
