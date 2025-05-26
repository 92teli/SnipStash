"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight, Code2 } from "lucide-react"

const comparisons = [
  {
    tool: "Notion",
    pros: ["Great for docs"],
    cons: ["But organizing snippets feels like writing a blog"],
    icon: "🗂️",
  },
  {
    tool: "VS Code Snippets",
    pros: ["Fast insert"],
    cons: ["Good luck finding that snippet you wrote 3 months ago"],
    icon: "⚙️",
  },
  {
    tool: "GitHub Gists",
    pros: ["Public sharing"],
    cons: ["No search, no folders, no context — just noise"],
    icon: "📎",
  },
  {
    tool: "Sticky Notes",
    pros: ["Right there on your monitor"],
    cons: ["Until they're gone, lost, or illegible"],
    icon: "📒",
  },
]

const snipstashFeatures = [
  {
    title: "Auto-Tags Code Intelligently",
    description: "You paste. We get it. No config needed.",
    icon: "🧠",
  },
  {
    title: "Fuzzy Search on Everything",
    description: "Title, tag, language, even partial matches.",
    icon: "🔎",
  },
  {
    title: "Folder + Manual Tagging",
    description: '"React Basics", "Deploy Tricks", "One-liners" — your flow, your rules.',
    icon: "🗂",
  },
  {
    title: "Usage Tracking",
    description: "Know what you copy the most. Prioritize what matters.",
    icon: "📊",
  },
  {
    title: "Dark Mode Dev UI",
    description: "Built by devs who wince at white screens.",
    icon: "🌘",
  },
]

export function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 relative z-10 bg-slate-900">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-mono text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
              🔥 THE COMPARISON
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Built for Devs Who've{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tried Everything Else
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            "I've tried..." And none of it actually stuck.
          </motion.p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-slate-800/60 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 h-full">
                <div className="text-center mb-4">
                  <motion.div
                    className="text-3xl mb-2"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {comparison.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">{comparison.tool}</h3>
                </div>

                <div className="space-y-3">
                  {comparison.pros.map((pro, proIndex) => (
                    <motion.div
                      key={proIndex}
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 + proIndex * 0.1 }}
                    >
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{pro}</span>
                    </motion.div>
                  ))}

                  {comparison.cons.map((con, conIndex) => (
                    <motion.div
                      key={conIndex}
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 + conIndex * 0.1 }}
                    >
                      <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{con}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SnipStash Solution - Developer Centric Design */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                💻 DEVELOPER TERMINAL
              </span>
            </motion.div>
          </motion.div>

          {/* Terminal-style Header */}
          <motion.div
            className="bg-slate-800 rounded-t-lg border border-slate-700 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">~/dev/snippet-manager</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-bold text-white">SnipStash</span>
              </div>
            </div>
          </motion.div>

          {/* Terminal Content */}
          <motion.div
            className="bg-slate-900 rounded-b-lg border-x border-b border-slate-700 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Command Line Introduction */}
            <div className="font-mono text-sm mb-6">
              <motion.div
                className="flex items-center space-x-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <span className="text-green-400">$</span>
                <span className="text-blue-400">npm install</span>
                <span className="text-white">@snipstash/cli</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <span className="text-green-400">$</span>
                <span className="text-yellow-400">snipstash</span>
                <span className="text-white">--init</span>
              </motion.div>
              <motion.div
                className="text-gray-400 mb-6 pl-4 border-l-2 border-blue-500/30"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="mb-2">✓ Initializing your code vault...</div>
                <div className="mb-2">✓ Setting up intelligent tagging...</div>
                <div className="mb-2">✓ Configuring search indexing...</div>
                <div className="text-green-400">✓ Ready to revolutionize your workflow!</div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Description */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Code2 className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">SnipStash — Built Different</h3>
                </div>

                <div className="space-y-4 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    <span className="text-blue-400 font-mono">&gt;</span> SnipStash isn't trying to replace your IDE or
                    your docs.
                  </p>
                  <p className="text-lg leading-relaxed pl-4">
                    <span className="text-purple-400 font-semibold">It fills the gap between them</span> — where your
                    real-world, reusable code lives.
                  </p>
                </div>

                {/* Code-style Features */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-gray-400">// Core Features:</div>
                    <div className="text-blue-400">const features = {`{`}</div>
                    <div className="pl-4 space-y-1">
                      <div>
                        <span className="text-green-400">autoTagging</span>:{" "}
                        <span className="text-yellow-400">'AI-powered'</span>,
                      </div>
                      <div>
                        <span className="text-green-400">search</span>:{" "}
                        <span className="text-yellow-400">'fuzzy + instant'</span>,
                      </div>
                      <div>
                        <span className="text-green-400">organization</span>:{" "}
                        <span className="text-yellow-400">'your-way'</span>,
                      </div>
                      <div>
                        <span className="text-green-400">analytics</span>:{" "}
                        <span className="text-yellow-400">'usage-tracking'</span>,
                      </div>
                      <div>
                        <span className="text-green-400">ui</span>:{" "}
                        <span className="text-yellow-400">'dark-mode-only'</span>
                      </div>
                    </div>
                    <div className="text-blue-400">{`}`};</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Visual Elements */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {/* Feature Cards */}
                {snipstashFeatures.slice(0, 3).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Terminal Output Style */}
                <motion.div
                  className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 font-mono text-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.9 }}
                >
                  <div className="text-green-400 mb-2">$ snipstash stats</div>
                  <div className="text-gray-400 space-y-1">
                    <div>
                      📊 Snippets saved: <span className="text-white">1,247</span>
                    </div>
                    <div>
                      🔍 Searches performed: <span className="text-white">3,891</span>
                    </div>
                    <div>
                      ⚡ Avg. retrieval time: <span className="text-white">23ms</span>
                    </div>
                    <div>
                      🎯 Productivity boost: <span className="text-green-400">+340%</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-8 pt-6 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-lg px-8 py-6 shadow-lg shadow-blue-500/25"
              >
                <a href="/signin" className="flex items-center">
                  🟢 Try SnipStash Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
