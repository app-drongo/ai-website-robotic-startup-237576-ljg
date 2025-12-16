'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Shield, Rocket, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to build, deploy, and scale your applications with confidence',
  ctaText: 'View Pricing',
  ctaHref: '/pricing',
  features: [
    {
      id: '1',
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Optimized infrastructure delivers sub-100ms response times globally with edge computing and intelligent caching.',
      highlights: ['99.9% uptime SLA', 'Global CDN', 'Auto-scaling'],
    },
    {
      id: '2',
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.',
      highlights: ['SOC 2 Type II', 'Zero-trust architecture', '24/7 monitoring'],
    },
    {
      id: '3',
      icon: 'Rocket',
      title: 'Seamless Integration',
      description:
        'Connect with 100+ tools and services through our robust API ecosystem and pre-built integrations.',
      highlights: ['REST & GraphQL APIs', 'Webhook support', 'SDK libraries'],
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Zap: Zap,
      Shield: Shield,
      Rocket: Rocket,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className="mb-6">{getIcon(feature.icon)}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  {feature.highlights.map((highlight, highlightIdx) => (
                    <div key={highlightIdx} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">
                        <span data-editable={`features[${idx}].highlights[${highlightIdx}]`}>
                          {highlight}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 mb-4"
              >
                Ready to get started?
              </Badge>
              <p className="text-lg text-muted-foreground">
                Join thousands of teams already building with our platform
              </p>
            </div>

            <Button
              onClick={handleCtaClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
