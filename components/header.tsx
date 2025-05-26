"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code2, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">SnipStash</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#folders" className="hover:text-blue-400 transition-colors">
              Folders
            </a>
            <a href="#analytics" className="hover:text-blue-400 transition-colors">
              Analytics
            </a>
            <a href="/signin" className="hover:text-blue-400 transition-colors">
              Sign In
            </a>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
              <a href="/signin" className="flex items-center">
                Save My Snippets →
              </a>
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 border-t border-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="hover:text-blue-400 transition-colors">
                Features
              </a>
              <a href="#folders" className="hover:text-blue-400 transition-colors">
                Folders
              </a>
              <a href="#analytics" className="hover:text-blue-400 transition-colors">
                Analytics
              </a>
              <a href="/signin" className="hover:text-blue-400 transition-colors">
                Sign In
              </a>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 w-full">
                <a href="/signin" className="flex items-center justify-center w-full">
                  Save My Snippets →
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
