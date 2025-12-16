'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Zap, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Business with Next-Generation Robotics',
  subtitle:
    'Cutting-edge robotic solutions that automate complex tasks, increase efficiency, and drive innovation across manufacturing, logistics, and service industries.',
  ctaText: 'Start Your Automation Journey',
  ctaHref: '/get-started',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt: 'Advanced robotic automation in modern manufacturing facility',
  badgeText: 'Industry Leader in AI Robotics',
  stats: [
    { icon: 'TrendingUp', value: '300%', label: 'Efficiency Increase' },
    { icon: 'Users', value: '500+', label: 'Companies Automated' },
    { icon: 'Zap', value: '24/7', label: 'Continuous Operation' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    setIsVideoPlaying(true);
    navigate(config.secondaryCtaHref);
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
              >
                <span data-editable="badgeText">{config.badgeText}</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold group"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {config.stats.map((stat, idx) => (
                <Card key={idx} className="bg-card text-card-foreground border-border/50">
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {getStatIcon(stat.icon)}
                    </div>
                    <div className="text-2xl font-bold">
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

          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <Image
                src={config.heroImageUrl}
                alt={config.heroImageAlt}
                data-editable-src="heroImageUrl"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-auto shadow-2xl transition-transform hover:scale-105 duration-300"
                priority
              />

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg animate-pulse">
                <Zap className="h-6 w-6" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-4 rounded-full shadow-lg animate-bounce">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
    </section>
  );
}
