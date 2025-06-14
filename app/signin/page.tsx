"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Code2,
  Github,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Terminal,
  Zap,
  Shield,
  Sparkles,
  User,
  Lock,
  CheckCircle,
  Star,
  Fingerprint,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { supabase } from '@/integrations/supabase/client'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("abctest@gmail.com")
  const [password, setPassword] = useState("Abc123")
  const [name, setName] = useState("")
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null)
  const router = useRouter()
  const { user, signIn, signUp } = useAuth()

  // If already logged in, redirect to dashboard
  if (typeof window !== "undefined" && user) {
    router.replace("/dashboard")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (activeTab === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        toast.error('Invalid email or password', {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        })
        setIsLoading(false)
        return
      }

      toast.success("Signed in successfully!", {
        duration: 2000,
        position: "top-center",
      })
      router.replace("/dashboard")
    } else {
      const { error } = await signUp(email, password, name)
      
      if (error) {
        toast.error('Failed to create account', {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        })
        setIsLoading(false)
        return
      }

      toast.success("Account created! Please check your email to verify.", {
        duration: 4000,
        position: "top-center",
      })
      router.replace("/dashboard")
    }
    
    setIsLoading(false)
  }

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    try {
      setOauthLoading(provider);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        toast.error(`Failed to sign in with ${provider}: ${error.message}`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        });
      }
    } catch (err) {
      console.error('OAuth error:', err);
      toast.error(`Failed to sign in with ${provider}`, {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155",
        },
      });
    } finally {
      setOauthLoading(null);
    }
  };

  const features = [
    {
      icon: Terminal,
      text: "CLI Integration",
      description: "Seamless command-line workflow integration",
    },
    {
      icon: Zap,
      text: "Lightning Fast",
      description: "Sub-50ms search across all snippets",
    },
    {
      icon: Shield,
      text: "Secure & Private",
      description: "Bank-level encryption for your code",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.a href="/" className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <Code2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SnipStash</span>
            </motion.a>

            <motion.a
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              ← Back to Home
            </motion.a>
          </div>
        </div>
      </motion.header>

      <div className="pt-20 min-h-screen flex items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                  🚀 Developer Portal
                </span>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome to Your{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Code Universe
                </span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Join thousands of developers who've revolutionized their workflow with intelligent snippet management.
              </motion.p>
            </div>

            {/* Enhanced Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <motion.div
                    className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(51, 65, 85, 0.6)",
                      borderColor: "rgba(59, 130, 246, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">
                        {feature.text}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity" initial={false}>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Terminal Preview */}
            <motion.div
              className="bg-slate-800/60 rounded-lg p-3 sm:p-4 border border-slate-700 font-mono text-sm overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 ml-2">~/dev/snippets</span>
              </div>
              <div className="space-y-1 text-gray-300">
                <div>
                  <span className="text-green-400">$</span> snipstash login
                </div>
                <div className="text-blue-400">✓ Authentication successful</div>
                <div className="text-gray-400">✓ Syncing your code vault...</div>
                <div className="text-green-400">🚀 Ready to code smarter!</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Auth Form */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced Glow Effect */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <Card className="relative bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden rounded-lg sm:rounded-2xl p-4 sm:p-8">
              <CardHeader>
                <CardTitle>
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        animate={{
                          x: [0, 100, 0],
                          y: [0, -50, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.8,
                        }}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                      />
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>

                {/* Ultra-Enhanced Tab Switcher */}
                <div className="relative mb-8">
                  {/* Outer Glow Container */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main Tab Container */}
                  <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-2 border border-slate-600/30 shadow-2xl">
                    {/* Animated Background Indicator */}
                    <motion.div
                      className="absolute top-2 bottom-2 left-0 rounded-xl shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                      initial={false}
                      animate={{
                        x: activeTab === "signin" ? "0%" : "100%",
                        width: "50%",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.8,
                      }}
                    >
                      {/* Inner Shine Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Tab Buttons */}
                    <div className="relative flex">
                      {[
                        {
                          key: "signin",
                          label: "Sign In",
                          icon: Lock,
                          description: "Welcome back",
                        },
                        {
                          key: "signup",
                          label: "Create Account",
                          icon: User,
                          description: "Join the community",
                        },
                      ].map((tab) => (
                        <motion.button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as "signin" | "signup")}
                          className="relative flex-1 py-4 px-6 rounded-xl text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center space-y-1 z-10 group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Icon with Enhanced Animation */}
                          <motion.div
                            className="relative"
                            animate={{
                              scale: activeTab === tab.key ? 1.2 : 1,
                              rotate: activeTab === tab.key ? [0, 360] : 0,
                            }}
                            transition={{
                              duration: activeTab === tab.key ? 0.6 : 0.3,
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <tab.icon
                              className={`h-5 w-5 transition-all duration-300 ${
                                activeTab === tab.key
                                  ? "text-white drop-shadow-lg"
                                  : "text-gray-400 group-hover:text-gray-200"
                              }`}
                            />

                            {/* Icon Glow Effect */}
                            {activeTab === tab.key && (
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-full blur-md"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              />
                            )}
                          </motion.div>

                          {/* Label */}
                          <motion.span
                            className={`transition-all duration-300 ${
                              activeTab === tab.key ? "text-white font-bold" : "text-gray-400 group-hover:text-gray-200"
                            }`}
                            animate={{
                              y: activeTab === tab.key ? -1 : 0,
                            }}
                          >
                            {tab.label}
                          </motion.span>

                          {/* Subtitle */}
                          <motion.span
                            className={`text-xs transition-all duration-300 ${
                              activeTab === tab.key ? "text-blue-100" : "text-gray-500 group-hover:text-gray-400"
                            }`}
                            animate={{
                              opacity: activeTab === tab.key ? 1 : 0.7,
                            }}
                          >
                            {tab.description}
                          </motion.span>

                          {/* Active Indicator Stars */}
                          <AnimatePresence>
                            {activeTab === tab.key && (
                              <>
                                <motion.div
                                  className="absolute -top-1 -right-1 w-3 h-3"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                </motion.div>

                                <motion.div
                                  className="absolute -bottom-1 -left-1 w-2 h-2"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>

                          {/* Hover Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                        </motion.button>
                      ))}
                    </div>

                    {/* Tab Separator Line */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>

                {/* Dynamic Header Content with Enhanced Animation */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  className="text-center mb-6"
                >
                  <motion.div
                    className="flex items-center justify-center mb-3"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Fingerprint className="h-8 w-8 text-blue-400 mr-2" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                      {activeTab === "signin" ? "Welcome Back!" : "Join SnipStash"}
                    </h2>
                  </motion.div>

                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {activeTab === "signin"
                      ? "Sign in to access your personalized code universe"
                      : "Create your developer account and join thousands of coders"}
                  </motion.p>
                </motion.div>
              </CardContent>

              {/* Form Content */}
              <div className="px-8 pb-8 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.form
                    key={activeTab}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                  >
                    {activeTab === "signup" && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor="name" className="text-gray-300 font-medium">
                          Developer Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2 transition-all duration-200 pl-10"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </motion.div>
                    )}
                    {/* Demo credentials notice - Moved */}
<div className="flex items-center gap-2 bg-red-900/40 border border-red-500/60 text-red-200 rounded px-2 py-1 mb-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>
                    <b>Demo Credentials:</b> <span className="font-mono">abctest@gmail.com</span> / <span className="font-mono">Abc123</span>
                  </span>
                </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300 font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="dev@example.com"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2 transition-all duration-200 pl-10"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300 font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2 transition-all duration-200 pl-10 pr-10"
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </motion.button>
                      </div>
                    </div>

                    {activeTab === "signin" && (
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="flex items-center space-x-2 cursor-pointer select-none group">
                          <span className="relative w-5 h-5 flex-shrink-0">
                          <input
                            type="checkbox"
                              checked={rememberMe}
                              onChange={e => setRememberMe(e.target.checked)}
                              className="appearance-none w-5 h-5 rounded-md border border-slate-600 bg-slate-800 checked:bg-gradient-to-br checked:from-blue-500 checked:to-purple-500 checked:border-blue-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                            />
                            {rememberMe && (
                              <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M6 10l3 3l5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">Remember me</span>
                        </label>
                        <motion.a
                          href="#"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          Forgot password?
                        </motion.a>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 py-6 text-lg font-semibold relative overflow-hidden group shadow-lg shadow-blue-500/25"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Processing...
                          </div>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Sparkles className="mr-2 h-5 w-5" />
                            {activeTab === "signin" ? "Sign In to SnipStash" : "Create Your Account"}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </span>
                        )}

                        {/* Enhanced Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      </Button>
                    </motion.div>

                    <div className="relative">
                      <Separator className="bg-slate-600" />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-4 text-sm text-gray-400">
                        or continue with
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full py-6 bg-slate-700/50 border border-slate-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200"
                        onClick={() => {
                          console.log('GitHub button clicked');
                          handleOAuthSignIn('github');
                        }}
                        disabled={oauthLoading === 'github'}
                      >
                        {oauthLoading === 'github' ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          <>
                            <Github className="mr-2 h-5 w-5" />
                            GitHub
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full py-6 bg-slate-700/50 border border-slate-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200"
                        onClick={() => {
                          console.log('Google button clicked');
                          handleOAuthSignIn('google');
                        }}
                        disabled={oauthLoading === 'google'}
                      >
                        {oauthLoading === 'google' ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          <>
                            <Mail className="mr-2 h-5 w-5" />
                            Google
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                </AnimatePresence>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-400">
                    {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
                    <motion.button
                      onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeTab === "signin" ? "Sign up for free" : "Sign in instead"}
                    </motion.button>
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
