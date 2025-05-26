"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"
import { CodeEditor3D } from "@/components/code-editor-3d"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.div
              className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              🖤 SnipStash – Your Second Brain for Code
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Code Deserves a Home as{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Smart as You
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A blazing-fast, dev-first snippet organizer that auto-tags your code, groups it intelligently, and makes
              reusing a joy — not a scavenger hunt.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-lg px-8 py-6"
            >
              <a href="/signin" className="flex items-center">
                <Code2 className="mr-2 h-5 w-5" />
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CodeEditor3D />
        </motion.div>
      </div>
    </section>
  )
}
