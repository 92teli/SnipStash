"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Trophy, Copy } from "lucide-react"

const mockData = {
  topSnippets: [
    { name: "debounce utility", copies: 47, language: "JavaScript" },
    { name: "API error handler", copies: 32, language: "TypeScript" },
    { name: "Docker compose", copies: 28, language: "YAML" },
    { name: "React hook form", copies: 24, language: "React" },
    { name: "SQL query builder", copies: 19, language: "SQL" },
  ],
  trends: [
    { month: "Jan", copies: 45 },
    { month: "Feb", copies: 52 },
    { month: "Mar", copies: 61 },
    { month: "Apr", copies: 58 },
    { month: "May", copies: 73 },
  ],
}

export function AnalyticsPeek() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="analytics" ref={ref} className="py-20 px-4 relative z-10">
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
            <span className="text-sm font-mono text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              📊 USAGE ANALYTICS
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What's Your Most{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Used Snippet?
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Track your coding patterns and discover your most valuable snippets
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Top Snippets */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 bg-slate-800/60 border-slate-700">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Top 5 Copied Snippets</h3>
              </div>

              <div className="space-y-4">
                {mockData.topSnippets.map((snippet, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-medium">{snippet.name}</div>
                        <Badge variant="outline" className="text-xs border-slate-600 text-gray-400">
                          {snippet.language}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-400">
                      <Copy className="h-4 w-4" />
                      <span className="font-mono">{snippet.copies}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Usage Trends */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6 bg-slate-800/60 border-slate-700">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Usage Trends</h3>
              </div>

              <div className="space-y-4">
                {mockData.trends.map((trend, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-gray-400 w-12">{trend.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${(trend.copies / 80) * 100}%` } : {}}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </div>
                    <span className="text-white font-mono w-8 text-right">{trend.copies}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center space-x-2 text-blue-400">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">73 copies this month</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">+26% from last month</p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
