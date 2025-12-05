import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Zap, Crown, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Stripe will be initialized when needed
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface Plan {
  name: string
  price: string
  priceValue: number
  credits: number
  description: string
  features: string[]
  popular?: boolean
  icon: React.ReactNode
  gradient: string
  stripePriceId?: string // Stripe Price ID for checkout
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    priceValue: 0,
    credits: 5,
    description: 'Perfect for trying out AADC',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-gray-500 to-gray-600',
    features: [
      '5 credits per month',
      'Basic AI models',
      'Community support',
      'Standard response time',
    ],
  },
  {
    name: 'Starter',
    price: '$20',
    priceValue: 20,
    credits: 25,
    description: 'For developers who ship fast',
    popular: true,
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-red-500 to-orange-500',
    stripePriceId: 'price_starter_25_credits', // Replace with your Stripe Price ID
    features: [
      '25 credits',
      'All AI models',
      'Priority support',
      'Faster response time',
      'Advanced features',
      'Project memory',
    ],
  },
  {
    name: 'Pro',
    price: '$100',
    priceValue: 100,
    credits: 150,
    description: 'For teams and power users',
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    stripePriceId: 'price_pro_150_credits', // Replace with your Stripe Price ID
    features: [
      '150 credits',
      'All AI models',
      'Dedicated support',
      'Fastest response time',
      'All advanced features',
      'Unlimited project memory',
      'Team collaboration',
      'Custom integrations',
    ],
  },
]

export function PricingCards() {
  const [selectedPlan] = useState<string>('Starter')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handlePurchase = (plan: Plan) => {
    if (plan.priceValue === 0) {
      // Free plan - just navigate to signup
      if (!user) {
        navigate('/signup')
      } else {
        navigate('/dashboard')
      }
    }
    // Paid plans are disabled (Coming Soon)
  }

  return (
    <div className="py-12">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className="text-gray-400">One-time credit purchases</span>
        <span className="px-3 py-1 text-xs font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
          🚧 Payments Coming Soon
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-8 ${
              plan.popular
                ? 'bg-gradient-to-b from-red-500/20 to-transparent border-2 border-red-500/50 glow'
                : 'glass'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-8">
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${plan.gradient} text-white`}>
                  {plan.credits} credits
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => plan.priceValue === 0 ? handlePurchase(plan) : null}
              disabled={plan.priceValue > 0}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                plan.popular
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-500 hover:to-orange-400 hover:glow-sm'
                  : selectedPlan === plan.name
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {plan.priceValue === 0 ? (
                user ? 'Current Plan' : 'Get Started Free'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚧 Coming Soon
                </span>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Credit Explanation */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 max-w-2xl mx-auto">
          <span className="text-white font-medium">What's a credit?</span> Each credit allows you to send one request to the AI. 
          Complex tasks may use multiple credits. Credits reset monthly.
        </p>
      </div>
    </div>
  )
}
