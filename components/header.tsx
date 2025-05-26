"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code2, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Find the active section
      const sections = ["features", "folders", "analytics"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      setActiveSection(currentSection || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const navLinkClass = (section: string) => `
    relative px-2 py-1 transition-all duration-300
    ${activeSection === section 
      ? "text-blue-400" 
      : "text-gray-300 hover:text-blue-400"
    }
    before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0
    before:bg-gradient-to-r before:from-blue-400 before:to-purple-500
    before:transition-all before:duration-300 before:ease-out
    hover:before:w-full
    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
    after:bg-gradient-to-r after:from-blue-400 after:to-purple-500
    after:blur-[2px] after:opacity-0 after:transition-all after:duration-300
    hover:after:w-full hover:after:opacity-100
    ${activeSection === section ? "before:w-full after:w-full after:opacity-100" : ""}
  `

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
            <a 
              href="#features" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("features")
              }}
              className={navLinkClass("features")}
            >
              Features
            </a>
            <a 
              href="#folders" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("folders")
              }}
              className={navLinkClass("folders")}
            >
              Folders
            </a>
            <a 
              href="#analytics" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("analytics")
              }}
              className={navLinkClass("analytics")}
            >
              Analytics
            </a>
            <a href="/signin" className={navLinkClass("signin")}>
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
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("features")
                  setIsMobileMenuOpen(false)
                }}
                className={navLinkClass("features")}
              >
                Features
              </a>
              <a 
                href="#folders" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("folders")
                  setIsMobileMenuOpen(false)
                }}
                className={navLinkClass("folders")}
              >
                Folders
              </a>
              <a 
                href="#analytics" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("analytics")
                  setIsMobileMenuOpen(false)
                }}
                className={navLinkClass("analytics")}
              >
                Analytics
              </a>
              <a href="/signin" className={navLinkClass("signin")}>
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
