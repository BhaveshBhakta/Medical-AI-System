import { motion } from 'framer-motion';
import { 
  ArrowRight, Microscope, LineChart, ShieldCheck, 
  Terminal, Cpu, Cloud, Database, MoveRight, 
  Activity, Zap, Globe, Lock 
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: () => void;
}

export default function LandingPage({ onStartAnalysis }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Activity className="text-slate-950 w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white font-display">NEURO<span className="text-cyan-400">SCAN</span></span>
          </div>
          <nav className="hidden lg:flex gap-8">
            {[''].map((item) => (
              <a key={item} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors" href="#">{item}</a>
            ))}
          </nav>
        </div>
        <button 
          onClick={onStartAnalysis}
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          Launch Portal
        </button>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-8 md:px-20">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">AI Analytics Online</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold leading-[0.95] mb-6 text-white tracking-tighter">
                Decoding <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Neural Structures</span> with AI Precision.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
                The world’s most advanced explainable AI for neuro-radiology. Transform complex MRI data into actionable clinical insights in seconds.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <button 
                  onClick={onStartAnalysis}
                  className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-cyan-400 transition-all group"
                >
                  Start New Scan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                {[
                  { label: "Latency", value: "0.4ms" },
                  { label: "Accuracy", value: "99.2%" },
                  { label: "Nodes", value: "1.2k+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-white text-2xl font-bold font-mono">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <img 
                  alt="AI neural processing" 
                  className="w-full aspect-[4/5] object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=1000" 
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-400 font-mono text-sm mb-1">SCANNING_IN_PROGRESS...</p>
                      <p className="text-white font-bold">Patient_ID: #8829-X</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-800 rounded-lg border border-white/10 text-white font-mono text-xs">
                      88 FPS
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bento */}
        <section className="py-32 px-8 md:px-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-white tracking-tighter mb-4">Engineered for the <span className="text-cyan-400">High-Stakes</span>.</h2>
              <p className="text-slate-400 max-w-xl">Our multi-modal architecture ensures that every pixel is accounted for, providing clinical validation at every step.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Large Bento Card */}
              <div className="md:col-span-4 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
                <div className="max-w-md">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                    <Microscope size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Explainable Logic Layers</h3>
                  <p className="text-slate-400 leading-relaxed">Unlike standard deep learning models, NeuroScan identifies specifically why a decision was reached, mapping neural pathways in a human-readable format.</p>
                </div>
                <div className="mt-12 flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full bg-cyan-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Small Bento Card */}
              <div className="md:col-span-2 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 transition-all">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Edge Inference</h3>
                <p className="text-slate-400 text-sm">Analyze DICOM files locally. No patient data ever leaves your network perimeter.</p>
              </div>

              {/* Grid Feature */}
              {[
                { icon: Lock, title: "HIPAA Compliant", desc: "Enterprise-grade encryption standards." },
                { icon: Globe, title: "Global Access", desc: "Collaborate across hospital networks." },
                { icon: ShieldCheck, title: "FDA Approved", desc: "Certified for clinical environments." }
              ].map((f, i) => (
                <div key={i} className="md:col-span-2 bg-slate-950 border border-white/5 rounded-3xl p-8 hover:bg-slate-900 transition-all">
                  <f.icon className="text-slate-500 mb-4" size={20} />
                  <h4 className="text-white font-bold mb-2">{f.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-cyan-600 to-blue-700 p-1 bg-slate-900 overflow-hidden relative">
            <div className="bg-slate-950 rounded-[2.9rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent)]" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Modernize your radiology workflow today.</h2>
              <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto relative z-10">Join 150+ medical centers using NeuroScan to reduce diagnostic errors and save critical intervention time.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button onClick={onStartAnalysis} className="px-8 py-4 bg-cyan-500 text-slate-950 rounded-xl font-bold hover:scale-105 transition-transform">Get Started Free</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
        <p>© 2026 NEUROSCAN</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-cyan-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Ethics</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Security</a>
        </div>
      </footer>
    </div>
  );
}