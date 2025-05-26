"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Puzzle, FolderOpen, Search, Rocket } from "lucide-react"

const steps = [
  {
    icon: Brain,
    title: "Paste your code",
    description: "Drop any snippet and watch the magic happen",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Puzzle,
    title: "Auto-tagging starts",
    description: "AI identifies language, patterns, and purpose",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FolderOpen,
    title: "Folder grouping",
    description: "Smart categorization based on your workflow",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Search,
    title: "Search in seconds",
    description: "Find anything with fuzzy search across all metadata",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Rocket,
    title: "Copy & track usage",
    description: "One-click copy with usage analytics",
    gradient: "from-red-500 to-pink-500",
  },
]

export function DeveloperFlow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-800/30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              ⚡ DEVELOPER WORKFLOW
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From chaos to clarity —{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              in 15 seconds
            </span>
          </motion.h2>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Animated Connection Line */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          >
            <div className="h-full bg-gradient-to-r from-purple-500/20 via-blue-500/40 via-green-500/40 via-yellow-500/40 to-red-500/20 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/50"
              animate={{
                x: ["0%", "calc(100vw - 8rem)"],
              }}
              transition={{
                duration: 3,
                delay: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="text-center relative">
                  {/* Floating Icon Container */}
                  <motion.div
                    className="relative mx-auto w-24 h-24 mb-8"
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-xl opacity-30`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />

                    {/* Icon Background */}
                    <div
                      className={`relative w-full h-full bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-2xl border border-white/10`}
                    >
                      <step.icon className="h-10 w-10 text-white drop-shadow-lg" />

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      />
                    </div>

                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 300 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.15 }}
                  >
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Hover Effect Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-12 -right-6 z-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.15 }}
                  >
                    <motion.div
                      className="text-blue-400/60"
                      animate={{
                        x: [0, 8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
