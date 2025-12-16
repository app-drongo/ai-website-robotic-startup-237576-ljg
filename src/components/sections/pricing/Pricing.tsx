'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Scale your startup with the right plan for your team',
  description:
    "Start free, upgrade when you're ready. All plans include our core features with premium support.",
  billingToggle: 'Monthly',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      icon: 'star',
      popular: false,
      features: [
        'Up to 3 team members',
        '5GB storage',
        'Basic analytics',
        'Email support',
        'Core integrations',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=starter',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Advanced features for growing teams and businesses',
      monthlyPrice: '$29',
      yearlyPrice: '$24',
      icon: 'zap',
      popular: true,
      features: [
        'Up to 15 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'All integrations',
        'Custom workflows',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      icon: 'crown',
      popular: false,
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Custom analytics',
        '24/7 dedicated support',
        'Custom integrations',
        'Enterprise security',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'crown':
        return <Crown className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={!isYearly ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setIsYearly(false)}
              className="px-6"
            >
              Monthly
            </Button>
            <Button
              variant={isYearly ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setIsYearly(true)}
              className="px-6"
            >
              Yearly
              <Badge variant="secondary" className="ml-2 text-xs">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {getIcon(plan.icon)}
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </CardTitle>

                <CardDescription className="text-base">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </CardDescription>

                <div className="pt-4">
                  <div className="text-4xl font-bold">
                    <span
                      data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                    >
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                  </div>
                  {plan.monthlyPrice !== 'Free' && plan.monthlyPrice !== 'Custom' && (
                    <div className="text-muted-foreground">
                      per user/{isYearly ? 'year' : 'month'}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Need a custom plan?
            <Button
              variant="link"
              className="p-0 ml-1 h-auto text-primary"
              onClick={() => navigate('/contact')}
            >
              Contact our sales team
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
