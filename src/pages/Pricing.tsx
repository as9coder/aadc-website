import { motion } from 'framer-motion'
import { PricingCards } from '../components/PricingCards'
import { MessageSquare, Shield, Zap } from 'lucide-react'

const faqs = [
  {
    question: 'What is a credit?',
    answer: 'A credit represents one AI request or interaction. Simple tasks use 1 credit, while complex multi-step tasks may use multiple credits.',
  },
  {
    question: 'Do credits roll over?',
    answer: 'Credits reset at the beginning of each billing cycle and do not roll over to the next month.',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes! You can change your plan at any time. Changes take effect immediately, and we\'ll prorate the difference.',
  },
  {
    question: 'What AI models are included?',
    answer: 'All paid plans include access to Gemini 3 Pro, GPT-5.1, Claude Sonnet 4.5, and Qwen. Free plan has access to basic models.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with your subscription.',
  },
]

const guarantees = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Response',
    description: 'Average response time under 2 seconds',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure',
    description: 'Your code is never stored or used for training',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Support',
    description: 'Get help when you need it',
  },
]

export function Pricing() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when you're ready.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <PricingCards />

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {guarantees.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 glass p-12 rounded-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a custom plan?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            For large teams or custom requirements, we offer tailored solutions. 
            Get in touch to discuss your needs.
          </p>
          <a
            href="mailto:contact@aadc.dev"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white glass hover:bg-white/20 rounded-xl transition-all"
          >
            Contact Sales
          </a>
        </motion.div>
      </div>
    </div>
  )
}
