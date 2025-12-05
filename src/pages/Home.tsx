import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Zap, Brain, Code2, Sparkles, Lock } from 'lucide-react'

const features = [
  {
    icon: <Terminal className="w-6 h-6" />,
    title: 'Terminal-First',
    description: 'Works right in your terminal. No context switching, no distractions.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Multiple AI Models',
    description: 'Choose from Gemini, GPT-5.1, Claude, Qwen, and more.',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Any Language',
    description: 'Python, TypeScript, Rust, Go, Swift, Kotlin – AADC speaks them all.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Streaming responses and optimized prompts for instant results.',
  },
]

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">Powered by cutting-edge AI models</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Code faster with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                AADC
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Agentic AI Developer Console. An AI-powered coding agent that lives in your terminal. 
              Build, debug, and ship code at the speed of thought.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/beta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-xl hover:from-red-500 hover:to-orange-400 transition-all glow"
              >
                <Lock className="w-5 h-5" />
                Request Beta Access
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white glass hover:bg-white/20 rounded-xl transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>

          {/* Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl overflow-hidden border border-white/10">
              <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-gray-400">aadc</span>
              </div>
              <div className="p-6 font-mono text-left text-sm">
                <div className="text-gray-400">$ aadc</div>
                <div className="mt-4 text-white">
                  ╭──────────────────────────────────────────────╮
                </div>
                <div className="text-white">
                  │  <span className="text-red-400">AADC</span> - Agentic AI Developer Console      │
                </div>
                <div className="text-white">
                  │  Version 1.0.0                               │
                </div>
                <div className="text-white">
                  ╰──────────────────────────────────────────────╯
                </div>
                <div className="mt-4 text-gray-400">Tips: Use /help for commands, /plan for plan mode</div>
                <div className="mt-4">
                  <span className="text-gray-500">&gt;</span>{' '}
                  <span className="text-white">Build me a REST API in TypeScript</span>
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to code faster
            </h2>
            <p className="text-gray-400 text-lg">
              AADC combines powerful AI with a seamless developer experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to supercharge your coding?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Currently in closed beta. Request access to be among the first.
              </p>
              <Link
                to="/beta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-xl hover:from-red-500 hover:to-orange-400 transition-all glow"
              >
                <Lock className="w-5 h-5" />
                Request Beta Access
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
