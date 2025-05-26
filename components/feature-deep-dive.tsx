"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Code, Database, Search, Copy } from "lucide-react"

const features = [
  {
    icon: Terminal,
    title: "AI Code Analysis",
    description: "Intelligent pattern recognition that understands your code context and purpose",
    code: `// Auto-detected: React Hook, State Management
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return { count, increment };
};

// Tags: react, hooks, state, counter`,
    tech: "AI/ML",
    complexity: "Advanced",
  },
  {
    icon: Search,
    title: "Fuzzy Search Engine",
    description: "Lightning-fast search across titles, tags, languages, and code content",
    code: `// Search: "debounce util" → Instant Results
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Found in 23ms across 1,247 snippets`,
    tech: "Search",
    complexity: "Optimized",
  },
  {
    icon: Database,
    title: "Smart Organization",
    description: "Automatic folder grouping that adapts to your development workflow",
    code: `// Auto-categorized: "API Utilities"
async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  
  return response.json();
}`,
    tech: "Organization",
    complexity: "Intelligent",
  },
  {
    icon: Copy,
    title: "Usage Analytics",
    description: "Track your most valuable snippets with detailed usage analytics",
    code: `// Most copied snippet this month ⭐
// Usage: 47 copies, 12 different projects

const formatCurrency = (amount, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Trending in: React, Utils, Formatting`,
    tech: "Analytics",
    complexity: "Insightful",
  },
  {
    icon: Code,
    title: "Developer Experience",
    description: "Built for developers, with syntax highlighting and IDE-like features",
    code: `// Custom tags + descriptions supported
// Tags: #deployment #docker #production
// Description: Production-ready containerization

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
    tech: "DevEx",
    complexity: "Seamless",
  },
]

export function FeatureDeepDive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" ref={ref} className="py-20 px-4 relative z-10">
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
            <span className="text-sm font-mono text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
              🔧 FEATURE DEEP DIVE
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Engineered for{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Developer Productivity
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Developer-Centric Feature Tabs */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 border-slate-700 group ${
                    activeFeature === index
                      ? "bg-slate-800/80 border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "bg-slate-800/40 hover:bg-slate-800/60 hover:border-slate-600"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon with Terminal-style Background */}
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        activeFeature === index
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-slate-700 text-gray-400 group-hover:bg-slate-600 group-hover:text-gray-300"
                      }`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </h3>

                        {/* Tech Badge */}
                        <div className="flex space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs font-mono ${
                              activeFeature === index
                                ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                : "border-slate-600 text-gray-400"
                            }`}
                          >
                            {feature.tech}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              activeFeature === index
                                ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
                                : "border-slate-600 text-gray-500"
                            }`}
                          >
                            {feature.complexity}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>

                      {/* Progress Indicator */}
                      {activeFeature === index && (
                        <motion.div
                          className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Code Preview */}
          <motion.div
            className="sticky top-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-slate-800/90 backdrop-blur-sm border-slate-700 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono text-xs"
                  >
                    {features[activeFeature].title}
                  </Badge>
                  <div className="text-xs text-gray-400 font-mono">
                    ~/snippets/{features[activeFeature].tech.toLowerCase()}
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <motion.div
                key={activeFeature}
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-mono text-sm">
                  <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {features[activeFeature].code}
                  </pre>
                </div>
              </motion.div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-slate-900 border-t border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Active</span>
                  </span>
                  <span>Lines: {features[activeFeature].code.split("\n").length}</span>
                </div>

                <div className="text-gray-500 font-mono">
                  Feature {activeFeature + 1}/{features.length}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
