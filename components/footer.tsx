"use client"

import { useState } from "react"
import { Code2, Heart, Coffee } from "lucide-react"

export function Footer() {
  const [easterEgg, setEasterEgg] = useState(false)

  const handleEasterEgg = () => {
    setEasterEgg(!easterEgg)
  }

  return (
    <footer className="relative z-10 bg-slate-900/90 backdrop-blur-sm border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">SnipStash</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your second brain for code. Built by developers, for developers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 SnipStash. Built with <Heart className="inline h-4 w-4 text-red-400" /> and{" "}
            <Coffee className="inline h-4 w-4 text-yellow-400" /> by devs, for devs.
          </p>

          <div className="mt-4 md:mt-0">
            <button
              onClick={handleEasterEgg}
              className="text-gray-500 hover:text-blue-400 transition-colors text-sm font-mono"
            >
              //snip
            </button>
            {easterEgg && (
              <div className="absolute bottom-4 right-4 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
                <p className="text-sm text-gray-300 mb-2">🎉 Easter egg found!</p>
                <p className="text-xs text-gray-400">Theme toggles coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
