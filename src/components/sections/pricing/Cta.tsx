'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  title: 'Ready to Transform Your Business?',
  subtitle: 'Join thousands of companies already scaling with our platform',
  description:
    'Start your free trial today and experience the power of modern tech solutions. No credit card required.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  badgeText: '14-day free trial',
  features: ['Enterprise-grade security', '99.9% uptime guarantee', '24/7 expert support'],
  stats: [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ],
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const iconMap = {
    0: Shield,
    1: Zap,
    2: Rocket,
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl max-w-5xl mx-auto">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <span data-editable="badgeText">{config.badgeText}</span>
                </Badge>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span data-editable="title">{config.title}</span>
                </h2>

                <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  <span data-editable="description">{config.description}</span>
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {config.features.map((feature, idx) => {
                  const IconComponent = iconMap[idx as keyof typeof iconMap] || Shield;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center space-x-3 text-muted-foreground"
                    >
                      <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                      <span data-editable={`features[${idx}]`} className="text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                  onClick={handlePrimaryClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  data-editable-href="primaryCtaHref"
                  data-href={config.primaryCtaHref}
                >
                  <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                  <ArrowRight
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
                  onClick={handleSecondaryClick}
                  data-editable-href="secondaryCtaHref"
                  data-href={config.secondaryCtaHref}
                >
                  <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8 border-t border-border/50">
                {config.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
    </section>
  );
}
