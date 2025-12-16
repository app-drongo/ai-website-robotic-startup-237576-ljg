'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Cpu, Shield, Zap, Brain, Settings } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Revolutionary Robotic Capabilities',
  sectionSubtitle:
    'Discover how our advanced robotics platform delivers unmatched performance and adaptability',
  features: [
    {
      icon: 'Bot',
      title: 'Autonomous Navigation',
      description:
        'Advanced AI-powered navigation system with real-time obstacle detection and path optimization for seamless operation in complex environments.',
      badge: 'Core Technology',
    },
    {
      icon: 'Cpu',
      title: 'Edge Computing Power',
      description:
        'High-performance onboard processing capabilities enabling real-time decision making without cloud dependency for mission-critical operations.',
      badge: 'Performance',
    },
    {
      icon: 'Shield',
      title: 'Industrial Grade Safety',
      description:
        'Multi-layered safety protocols with redundant systems, emergency stops, and compliance with international robotics safety standards.',
      badge: 'Safety First',
    },
    {
      icon: 'Zap',
      title: 'Rapid Deployment',
      description:
        'Plug-and-play architecture with intuitive setup process, reducing implementation time from weeks to hours across various industries.',
      badge: 'Efficiency',
    },
    {
      icon: 'Brain',
      title: 'Machine Learning Integration',
      description:
        'Continuous learning algorithms that adapt to new environments and optimize performance based on operational data and user feedback.',
      badge: 'AI-Powered',
    },
    {
      icon: 'Settings',
      title: 'Modular Architecture',
      description:
        'Flexible component system allowing customization for specific use cases with hot-swappable modules and seamless hardware upgrades.',
      badge: 'Scalable',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

const iconMap = {
  Bot,
  Cpu,
  Shield,
  Zap,
  Brain,
  Settings,
};

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Bot;

            return (
              <Card
                key={idx}
                className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
              >
                <CardContent className="p-8">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground text-xs font-medium"
                    >
                      <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      <span data-editable={`features[${idx}].description`}>
                        {feature.description}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl border border-border">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Ready to Transform Your Operations?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join industry leaders who are already leveraging our robotic solutions to increase
            efficiency, reduce costs, and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Badge variant="outline" className="text-sm px-4 py-2">
              🚀 500+ Deployments
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              ⚡ 99.9% Uptime
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              🏆 Industry Leading
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
