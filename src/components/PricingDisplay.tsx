
import { Check, Zap } from 'lucide-react';
import type { PricingTier } from '../types';

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: 29,
    videosPerMonth: 10,
    maxDuration: 8,
    quality: 'HD',
    support: 'email',
    features: [
      '10 videos per month',
      'Maximum duration 8 seconds',
      'HD quality',
      'Email support',
      'Basic prompt options'
    ]
  },
  {
    name: 'Professional',
    price: 99,
    videosPerMonth: 50,
    maxDuration: 15,
    quality: '4K',
    support: 'priority',
    popular: true,
    features: [
      '50 videos per month',
      'Maximum duration 15 seconds',
      '4K quality',
      'Priority support',
      'Advanced prompt options',
      'Brand colors'
    ]
  },
  {
    name: 'Business',
    price: 299,
    videosPerMonth: 200,
    maxDuration: 30,
    quality: '4K',
    support: 'priority',
    features: [
      '200 videos per month',
      'Maximum duration 30 seconds',
      '4K quality',
      'Priority support',
      'All prompt options',
      'Brand colors',
      'Team features',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    videosPerMonth: 999999,
    maxDuration: 60,
    quality: '4K',
    support: 'dedicated',
    features: [
      'Unlimited videos',
      'Maximum duration 60 seconds',
      '4K quality',
      'Dedicated support',
      'All features',
      'Custom integration',
      'SLA agreement',
      'Training and onboarding'
    ]
  }
];

interface PricingDisplayProps {
  onSelectTier?: (tier: string) => void;
}

export default function PricingDisplay({ onSelectTier }: PricingDisplayProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            Start creating AI videos today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                tier.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                
                <div className="mb-6">
                  {typeof tier.price === 'number' ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        {tier.price}€
                      </span>
                      <span className="text-gray-600 ml-2">/ mo</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-900">
                      {tier.price}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectTier?.(tier.name.toLowerCase())}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {typeof tier.price === 'number' ? 'Get Started' : 'Contact Us'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            All plans include a 14-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}