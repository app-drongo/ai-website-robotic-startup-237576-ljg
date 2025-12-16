'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_HERO = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your business needs. No hidden fees, no surprises.',
  description:
    'Start free and scale as you grow. All plans include our core features with premium support.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'View All Features',
  secondaryCtaHref: '/features',
  badge: '14-day free trial',
  features: ['Cancel anytime', '24/7 support', '99.9% uptime SLA'],
  stats: [
    { label: 'Active Users', value: '50K+' },
    { label: 'Countries', value: '120+' },
    { label: 'Uptime', value: '99.9%' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
            >
              <Star className="w-4 h-4 mr-2" />
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold transition-all duration-200"
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Zap
                className={`w-5 h-5 mr-2 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
              />
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {config.features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-muted-foreground">
                <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span data-editable={`features[${idx}]`} className="text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {config.stats.map((stat, idx) => (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
