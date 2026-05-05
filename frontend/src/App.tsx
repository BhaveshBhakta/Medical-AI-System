import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

enum View {
  LANDING = 'landing',
  DASHBOARD = 'dashboard'
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LANDING)

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <AnimatePresence mode="wait">
        {currentView === View.LANDING ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onStartAnalysis={() => setCurrentView(View.DASHBOARD)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard onBack={() => setCurrentView(View.LANDING)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}