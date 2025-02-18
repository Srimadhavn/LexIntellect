"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gavel, Scale, ArrowRight, BookOpen, Shield } from "lucide-react"
import { useRef } from "react"

interface LandingPageProps {
  onGetStarted: () => void;
}

const JusticeScale = () => {
  return (
    <motion.div
      className="relative w-96 h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Lady Justice */}
      <motion.div 
        className="absolute bottom-0 left-1/2 w-8 h-64 bg-gradient-to-t from-[#c7a44a] to-[#e0b854] transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Head */}
        <motion.div
          className="absolute -top-8 left-1/2 w-16 h-16 bg-gradient-to-r from-[#c7a44a] to-[#e0b854] transform -translate-x-1/2 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {/* Blindfold */}
          <div className="absolute top-1/2 left-0 w-full h-3 bg-white/30" />
        </motion.div>
      </motion.div>
      
      {/* Beam */}
      <motion.div
        className="absolute top-24 left-1/2 w-80 h-3 bg-gradient-to-r from-[#c7a44a] to-[#e0b854] transform -translate-x-1/2"
        style={{ transformOrigin: "center" }}
        initial={{ rotate: -20 }}
        animate={{ rotate: [20, -20, 0] }}
        transition={{
          duration: 4,
          times: [0, 0.6, 1],
          ease: "easeInOut",
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Chains */}
        <motion.div className="absolute left-0 top-0 w-1 h-20 origin-top"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 50%, transparent 50%)" }}
        />
        <motion.div className="absolute right-0 top-0 w-1 h-20 origin-top"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 50%, transparent 50%)" }}
        />

        {/* Scale Pans */}
        <motion.div
          className="absolute left-0 -bottom-20 w-20 h-4 rounded-full bg-gradient-to-br from-[#c7a44a] to-[#e0b854]"
          initial={{ y: -20 }}
          animate={{ y: [20, -20, 0] }}
          transition={{
            duration: 4,
            times: [0, 0.6, 1],
            ease: "easeInOut",
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="absolute inset-0 border-2 border-white/30 rounded-full" />
        </motion.div>
        
        <motion.div
          className="absolute right-0 -bottom-20 w-20 h-4 rounded-full bg-gradient-to-br from-[#c7a44a] to-[#e0b854]"
          initial={{ y: 20 }}
          animate={{ y: [-20, 20, 0] }}
          transition={{
            duration: 4,
            times: [0, 0.6, 1],
            ease: "easeInOut",
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="absolute inset-0 border-2 border-white/30 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Glowing Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#c7a44a]/20 to-transparent pointer-events-none" />
    </motion.div>
  )
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const featuresRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#c7a44a]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#c7a44a]"
            >
              LegalAI
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-8 items-center"
            >
              <Button variant="ghost" className="text-[#c7a44a] hover:text-[#e0b854]">
                Features
              </Button>
              <Button variant="ghost" className="text-[#c7a44a] hover:text-[#e0b854]">
                About
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-[#c7a44a] hover:bg-[#e0b854] text-black"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl font-bold leading-tight">
              <span className="text-[#c7a44a]">Justice</span> Meets
              <br />
              Intelligence
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Revolutionize your legal practice with AI-powered insights. 
              Let technology enhance your legal expertise while maintaining 
              the highest standards of justice and fairness.
            </p>
            <Button 
              onClick={onGetStarted}
              className="bg-[#c7a44a] hover:bg-[#e0b854] text-black px-8 py-6 text-lg rounded-full"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">
              <Scale className="w-full h-full text-[#c7a44a]" strokeWidth={1} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="relative py-32 border-t border-[#c7a44a]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ opacity, scale }}
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how our AI-powered platform revolutionizes legal work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-[#c7a44a]" />}
              title="Legal Research"
              description="Advanced AI-powered legal research and analysis"
            />
            <FeatureCard
              icon={<Scale className="h-8 w-8 text-[#c7a44a]" />}
              title="Case Analysis"
              description="Comprehensive case analysis and prediction"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-[#c7a44a]" />}
              title="Secure & Compliant"
              description="Bank-grade security for your legal documents"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-8 rounded-2xl border border-[#c7a44a]/20 hover:border-[#c7a44a] transition-colors duration-300"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}