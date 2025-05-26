"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "How does the magic happen?",
    answer:
      "SnipStash uses AI to analyze your code and automatically detect patterns, languages, and purpose. Just paste your code and watch it get intelligently organized.",
    icon: "🧠",
  },
  {
    question: "Is my code actually private?",
    answer:
      "Absolutely. Your snippets are encrypted and completely private to you. We use bank-level security and you control what (if anything) gets shared.",
    icon: "🔒",
  },
  {
    question: "How fast is the search really?",
    answer:
      "Sub-50ms search across everything. Title, tags, code content, even partial matches. It's faster than your IDE's search.",
    icon: "⚡",
  },
  {
    question: "Can I organize my own way?",
    answer:
      "Yes! Create custom folders, add manual tags, write descriptions. SnipStash adapts to your workflow, not the other way around.",
    icon: "🗂️",
  },
  {
    question: "What about my existing snippets?",
    answer:
      "Import from VS Code, GitHub Gists, or any text files. SnipStash will automatically organize and tag everything for you.",
    icon: "📥",
  },
  {
    question: "Any IDE integrations coming?",
    answer:
      "VS Code extension is in active development. We're building native integrations that feel like they belong in your editor.",
    icon: "🔌",
  },
]

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Need to Know
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-slate-800/60 border-slate-700 p-6 h-full flex flex-col">
                <div className="text-4xl text-blue-400 mb-4">{faq.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
