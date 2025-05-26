"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Folder, Tag, Copy, Play, Square, Minimize2 } from "lucide-react"

const codeExamples = [
  {
    language: "JavaScript",
    title: "useLocalStorage Hook",
    folder: "React Utilities",
    tags: ["react", "hooks", "localStorage"],
    extension: ".jsx",
    code: `import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};`,
  },
  {
    language: "Python",
    title: "Data Pipeline Processor",
    folder: "Python Scripts",
    tags: ["python", "data", "pipeline", "pandas"],
    extension: ".py",
    code: `import pandas as pd
from typing import List, Dict, Any
import logging

class DataPipeline:
    """Advanced data processing pipeline with error handling"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.logger = logging.getLogger(__name__)
    
    def process(self, data: pd.DataFrame, 
                transformations: List[Dict]) -> pd.DataFrame:
        """Apply transformations with comprehensive error handling"""
        result = data.copy()
        
        for i, transform in enumerate(transformations):
            try:
                operation = transform.get('operation')
                params = transform.get('params', {})
                
                if operation == 'filter':
                    result = self._apply_filter(result, params)
                elif operation == 'aggregate':
                    result = self._apply_aggregation(result, params)
                elif operation == 'transform':
                    result = self._apply_transformation(result, params)
                    
                self.logger.info(f"Step {i+1} completed: {operation}")
                
            except Exception as e:
                self.logger.error(f"Error in step {i+1}: {str(e)}")
                raise
        
        return result`,
  },
  {
    language: "TypeScript",
    title: "API Client with Retry Logic",
    folder: "API Utilities",
    tags: ["typescript", "api", "retry", "fetch"],
    extension: ".ts",
    code: `interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private retryConfig: RetryConfig;

  constructor(baseURL: string, retryConfig: RetryConfig) {
    this.baseURL = baseURL;
    this.retryConfig = retryConfig;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    let lastError: Error;

    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }

        const data = await response.json();
        return { data, status: response.status };
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.retryConfig.maxRetries) {
          const delay = Math.min(
            this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffFactor, attempt),
            this.retryConfig.maxDelay
          );
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }
}`,
  },
]

export function LiveActionCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % codeExamples.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % codeExamples.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + codeExamples.length) % codeExamples.length)
  }

  const currentExample = codeExamples[currentIndex]

  return (
    <section id="folders" ref={ref} className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Background */}

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-mono text-[#0E639C] bg-[#0E639C]/10 px-4 py-2 rounded-full border border-[#0E639C]/20">
              💻 LIVE IN ACTION
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {"It's not just code storage. It's your "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              second brain.
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* VS Code Window */}
          <div className="bg-[#1e1e2f] rounded-lg shadow-2xl border border-[#252537] overflow-hidden">
            {/* Title Bar */}
            <div className="bg-[#252537] px-4 py-3 flex items-center justify-between border-b border-[#1e1e2f]">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  {currentExample.title}
                  {currentExample.extension}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 hover:bg-[#1e1e2f] rounded transition-colors"
                >
                  {isPlaying ? (
                    <Square className="h-3 w-3 text-gray-400" />
                  ) : (
                    <Play className="h-3 w-3 text-gray-400" />
                  )}
                </button>
                <button className="p-1.5 hover:bg-[#1e1e2f] rounded transition-colors">
                  <Minimize2 className="h-3 w-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="bg-[#252537] px-4 flex items-center border-b border-[#1e1e2f]">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`px-4 py-2 text-sm font-medium border-r border-[#1e1e2f] transition-all ${
                    index === currentIndex
                      ? "bg-[#1e1e2f] text-white border-b-2 border-[#0E639C]"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#1e1e2f]/50"
                  }`}
                >
                  {example.title.split(" ")[0]}
                  {example.extension}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {/* File Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Folder className="h-4 w-4 text-[#0E639C]" />
                        <span>{currentExample.folder}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {currentExample.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-[#0E639C]/30 text-[#0E639C] bg-[#0E639C]/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="flex items-center space-x-2 px-3 py-1.5 bg-[#0E639C]/20 hover:bg-[#0E639C]/30 border border-[#0E639C]/30 rounded text-[#0E639C] text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </motion.button>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#1e1e2f] rounded-lg p-6 border border-[#252537] h-[520px]">
                    <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap h-full">
                      <motion.code
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {currentExample.code}
                      </motion.code>
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <motion.button
                  onClick={prevSlide}
                  className="p-2 bg-[#252537]/80 hover:bg-[#252537] rounded-full border border-[#1e1e2f] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-4 w-4 text-gray-300" />
                </motion.button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-2">
                <motion.button
                  onClick={nextSlide}
                  className="p-2 bg-[#252537]/80 hover:bg-[#252537] rounded-full border border-[#1e1e2f] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-[#252537] px-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {codeExamples.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-[#0E639C]" : "bg-gray-600"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <div className="text-xs text-gray-400">
                  {currentIndex + 1} / {codeExamples.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
