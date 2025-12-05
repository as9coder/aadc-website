import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Copy, Check, Apple, MonitorIcon, Laptop } from 'lucide-react'

type Platform = 'windows' | 'mac' | 'linux'

const installCommands: Record<Platform, string> = {
  windows: 'pip install aadc',
  mac: 'pip3 install aadc',
  linux: 'pip3 install aadc',
}

const platformInfo: Record<Platform, { name: string; icon: React.ReactNode }> = {
  windows: { name: 'Windows', icon: <MonitorIcon className="w-5 h-5" /> },
  mac: { name: 'macOS', icon: <Apple className="w-5 h-5" /> },
  linux: { name: 'Linux', icon: <Laptop className="w-5 h-5" /> },
}

const steps = [
  {
    step: '1',
    title: 'Install Python 3.8+',
    description: 'Make sure you have Python 3.8 or higher installed on your system.',
  },
  {
    step: '2',
    title: 'Install AADC',
    description: 'Run the pip install command to get AADC on your system.',
  },
  {
    step: '3',
    title: 'Start coding',
    description: 'Run aadc in your terminal and start building with AI.',
  },
]

export function Download() {
  const [platform, setPlatform] = useState<Platform>('windows')
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommands[platform])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Terminal className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Download AADC
          </h1>
          <p className="text-xl text-gray-400">
            Get started in seconds. Works on Windows, macOS, and Linux.
          </p>
        </motion.div>

        {/* Platform Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          {(Object.keys(platformInfo) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                platform === p
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {platformInfo[p].icon}
              {platformInfo[p].name}
            </button>
          ))}
        </motion.div>

        {/* Install Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-2xl mb-12"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-gray-400">$</span>
              <code className="text-lg text-white font-mono">{installCommands[platform]}</code>
            </div>
            <button
              onClick={copyCommand}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-gray-300 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Installation Steps
          </h2>
          <div className="space-y-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="bg-black/50 rounded-xl p-6 font-mono text-sm">
            <div className="text-gray-400"># Install AADC</div>
            <div className="text-white mt-2">$ {installCommands[platform]}</div>
            <div className="text-gray-400 mt-4"># Navigate to your project</div>
            <div className="text-white mt-2">$ cd your-project</div>
            <div className="text-gray-400 mt-4"># Start AADC</div>
            <div className="text-white mt-2">$ aadc</div>
            <div className="text-gray-400 mt-4"># Start coding with AI!</div>
            <div className="text-green-400 mt-2">&gt; Build me a REST API with user authentication</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Start with 5 free credits. Need more?
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 font-medium text-white glass hover:bg-white/20 rounded-xl transition-all"
          >
            View Pricing Plans
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
