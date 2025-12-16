'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Build the Future with AI-Powered Solutions',
  subtitle:
    'Transform your business with cutting-edge technology that scales. Join thousands of companies already accelerating their growth.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'View Demo',
  secondaryCtaHref: '/demo',
  badge: '🚀 Now in Beta',
  features: ['Deploy in minutes', '99.9% uptime SLA', 'Enterprise security'],
  stats: [
    { label: 'Active Users', value: '50K+' },
    { label: 'API Calls/Month', value: '10M+' },
    { label: 'Countries', value: '120+' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          <div
            className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Heading */}
          <div
            className={`mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span data-editable="title">{config.title}</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* Features List */}
          <div
            className={`mb-10 transition-all duration-700 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`mb-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg font-semibold"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`transition-all duration-700 delay-750 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {config.stats.map((stat, idx) => (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
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
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
