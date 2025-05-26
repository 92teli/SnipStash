"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Folder, Tag } from "lucide-react"

export function CodeEditor() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showTags, setShowTags] = useState(false)
  const [showFolder, setShowFolder] = useState(false)
  const [copied, setCopied] = useState(false)

  const codeSnippet = `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};`

  const tags = ["javascript", "utility", "performance", "debounce"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === 0) {
          setShowTags(true)
          return 1
        } else if (prev === 1) {
          setShowFolder(true)
          return 2
        } else if (prev === 2) {
          return 3
        } else {
          setShowTags(false)
          setShowFolder(false)
          setCopied(false)
          return 0
        }
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <Card className="relative bg-slate-800/90 backdrop-blur-sm border-slate-700 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <motion.button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-700 rounded-md transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </motion.button>
        </div>

        <div className="font-mono text-sm">
          <motion.pre
            className="text-gray-300 whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {codeSnippet}
          </motion.pre>
        </div>

        <AnimatePresence>
          {showTags && (
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <Tag className="h-3 w-3" />
                Auto-tagged:
              </div>
              {tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFolder && (
            <motion.div
              className="mt-4 flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Folder className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Moved to: JavaScript Utilities</span>
              <motion.div
                className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
