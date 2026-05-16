import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  BriefcaseMedical, 
  UserCheck, 
  GraduationCap 
} from "lucide-react";

// --- Helper Components ---

function AudienceItem({ title, desc, index }: { title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      className="group"
    >
      <h4 className="text-lg font-bold text-primary-navy mb-1 group-hover:text-medical-blue transition-colors">{title}</h4>
      <p className="text-on-surface-variant font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ProtocolCard({ id, title, desc, metric, index }: { id: string, title: string, desc: string, metric: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-white p-6 sm:p-8 md:p-12 space-y-12 hover:bg-surface-container transition-colors group"
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[9px] font-black text-medical-blue bg-medical-blue/5 px-2 py-1 rounded-sm">{id}</span>
        <span className="text-[10px] font-mono text-primary-navy/20 uppercase tracking-widest">{metric}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-navy tracking-tight group-hover:text-medical-blue transition-colors font-display">{title}</h3>
        <p className="text-on-surface-variant leading-relaxed font-light text-sm opacity-80">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value, index }: { label: string, value: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-2"
    >
      <h4 className="text-[10px] font-mono font-black text-primary-navy/30 uppercase tracking-[0.2em]">{label}</h4>
      <p className="text-base font-bold text-primary-navy font-display">{value}</p>
    </motion.div>
  );
}

function EcosystemModule({ icon: Icon, number, title, description }: { icon: any, number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="space-y-10 group"
    >
      <div className="flex justify-between items-start">
        <div className="w-16 h-16 rounded-full bg-white border border-black/5 flex items-center justify-center text-primary-navy group-hover:bg-medical-blue group-hover:text-white group-hover:border-medical-blue transition-all duration-700 shadow-sm">
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-mono font-black text-primary-navy/20 uppercase tracking-widest">{number}</span>
      </div>
      <div className="space-y-4 pt-4 border-t border-black/5">
        <h3 className="text-2xl font-bold text-primary-navy tracking-tight font-display group-hover:text-medical-blue transition-colors duration-500">{title}</h3>
        <p className="text-on-surface-variant font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// --- Sections ---

export function Navbar({
  onLaunch,
  launchLabel = "Try Screening",
}: {
  onLaunch: () => void;
  launchLabel?: string;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 h-20 flex justify-between items-center text-primary-navy">
        <div className="flex items-center cursor-pointer">
          <span className="font-sans text-xs sm:text-base md:text-lg font-bold tracking-tight uppercase">
            NEUROSCAN AI
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={onLaunch}
            className="bg-primary-navy text-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold transition-all text-[9px] sm:text-xs tracking-widest uppercase hover:bg-medical-blue shadow-lg shadow-primary-navy/10 whitespace-nowrap"
          >
            {launchLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex flex-col justify-center bg-white isolate">
      <div className="absolute top-0 left-0 w-full h-full gradient-mesh -z-10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-px h-64 bg-gradient-to-b from-medical-blue/50 to-transparent" />
        <div className="absolute top-1/3 left-10 w-4 h-px bg-medical-blue/50" />
        <div className="absolute bottom-1/4 right-20 w-px h-96 bg-gradient-to-t from-medical-blue/50 to-transparent" />
        <div className="absolute bottom-1/2 right-20 w-8 h-px bg-medical-blue/50" />
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white/50 backdrop-blur-xl rounded-full border border-black/5 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-medical-blue animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-black text-primary-navy/60">Research Model Active</span>
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary-navy leading-[0.9] sm:leading-[0.85] font-display"
            >
              Trustworthy <br className="hidden sm:block" />
              <span className="text-medical-blue italic font-medium">Diagnostics.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0"
            >
              An end-to-end medical imaging platform that goes beyond deep learning classifiers by incorporating <span className="font-bold text-primary-navy">Grad-CAM (XAI)</span> and <span className="font-bold text-primary-navy">Monte Carlo Dropout</span> for uncertainty-aware brain tumor analysis.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={onLaunch}
              className="group relative bg-primary-navy text-white px-10 py-5 rounded-full font-bold text-base overflow-hidden shadow-2xl shadow-primary-navy/20 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-xs">
                Launch Inference Engine <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-10 py-5 rounded-full font-bold text-base hover:bg-black/5 transition-all text-primary-navy/60 hover:text-primary-navy text-xs uppercase tracking-widest flex items-center gap-3">
              <Search size={18} /> Exploration Protocol
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-20 border-t border-black/5 w-full flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div className="flex items-center gap-6 opacity-40 grayscale transition-all">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Core Technologies</span>
              <div className="flex gap-8">
                <span className="font-bold text-sm tracking-tighter">PyTorch</span>
                <span className="font-bold text-sm tracking-tighter">Grad-CAM</span>
                <span className="font-bold text-sm tracking-tighter">MC Dropout</span>
                <span className="font-bold text-sm tracking-tighter">LLM Agents</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-primary-navy/40 font-mono text-[9px] uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-medical-blue rounded-full" /> 256-bit AES</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-medical-blue rounded-full" /> MRI Analysis</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectUtility() {
  return (
    <section className="py-40 bg-white border-y border-black/5 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="flex flex-col gap-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-medical-blue uppercase font-black block mb-6">Core Mission</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-navy leading-[1.1] font-display">
              Addressing the <span className="text-medical-blue italic font-medium">trust gap</span> in medical AI.
            </h2>
            <p className="mt-10 text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">
              In clinical settings, a prediction alone is insufficient. Clinicians need to understand the reasoning behind the decision and know how reliable the result is.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h3 className="text-sm font-bold text-primary-navy uppercase tracking-widest border-b border-black/10 pb-4 inline-block">Impact & Utility</h3>
              <div className="space-y-8">
                <AudienceItem index={0} title="Researchers" desc="studying explainable and trustworthy AI in healthcare." />
                <AudienceItem index={1} title="Students" desc="learning advanced applications of deep learning and LLMs." />
                <AudienceItem index={2} title="Clinicians" desc="who require interpretable AI-assisted decision support." />
                <AudienceItem index={3} title="Organizations" desc="exploring AI-based diagnostic systems." />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-full bg-surface-container rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 flex flex-col justify-end group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-medical-blue/5 blur-3xl -mr-32 -mt-32 rounded-full group-hover:bg-medical-blue/10 transition-colors duration-700" />
              <p className="text-xl md:text-2xl text-primary-navy font-display font-medium leading-tight relative z-10">
                "A single integrated platform combining <span className="text-medical-blue">prediction</span>, <span className="text-medical-blue">explanation</span>, and <span className="text-medical-blue">clinical reasoning</span>."
              </p>
              <div className="mt-8 flex gap-2 relative z-10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-1 bg-primary-navy/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                      className="h-full bg-medical-blue"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-medical-blue uppercase font-black block mb-4">Scientific Framework</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary-navy leading-none font-display">
              The Architecture <br />
              of <span className="text-medical-blue italic font-medium">Reliability.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-black/5 border border-black/5 rounded-[2rem] overflow-hidden">
            <ProtocolCard 
              index={0}
              id="MC-D"
              title="Uncertainty Quantification"
              desc="Monte Carlo Dropout and entropy passes quantify reliability. The system detects glioma, meningioma, pituitary tumors, and no tumor with a focus on trust."
              metric="4-Class Precision"
            />
            <ProtocolCard 
              index={1}
              id="G-CAM"
              title="Explainable AI"
              desc="Brain MRI scans are analyzed with Grad-CAM to highlight the exact regions influencing each prediction."
              metric="Multi-Modal XAI"
            />
            <ProtocolCard 
              index={2}
              id="LLM-R"
              title="Agentic Reasoning"
              desc="Prediction tensors are processed by an LLM-based reasoning pipeline to synthesize findings into structured, readable clinical reports."
              metric="Automated Reporting"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualInterpretation() {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 relative z-10">
        <div className="space-y-32">
          <div className="flex flex-col lg:flex-row justify-between items-center md:items-start gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl space-y-8 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-blue" />
                <span className="font-mono text-[9px] font-black text-primary-navy/40 tracking-[0.3em] uppercase">Core Methodology</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-primary-navy leading-[0.9] md:leading-[0.85] font-display">
                Truth & <br className="hidden md:block" />
                <span className="text-medical-blue font-medium italic">Explanation.</span>
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-sm pt-4 lg:pt-0 text-center md:text-left"
            >
               <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-light leading-relaxed">
                We bridge the gap between model predictions and clinical confidence. Every inference pathway is visualized through structural justification.
               </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-medical-blue uppercase tracking-[0.5em]">01 / Methodology</span>
                <h3 className="text-3xl font-bold text-primary-navy font-display">Explainable AI (Grad-CAM)</h3>
              </div>
              <p className="text-base text-on-surface-variant/70 font-light leading-relaxed">
                Structural activation maps identify exactly which features influenced the decision. We move beyond black-box classification into architectural justification, highlighting regions that triggered the model's focus.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4 text-sm font-bold text-primary-navy/40 uppercase tracking-widest font-mono">
                  <div className="w-8 h-px bg-black/10" /> Layer-4 Synthesis
                </li>
                <li className="flex items-center gap-4 text-sm font-bold text-primary-navy/40 uppercase tracking-widest font-mono">
                  <div className="w-8 h-px bg-black/10" /> Spatial Heatmaps
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-medical-blue uppercase tracking-[0.5em]">02 / Reliability</span>
                <h3 className="text-3xl font-bold text-primary-navy font-display">Uncertainty Estimation</h3>
              </div>
              <p className="text-base text-on-surface-variant/70 font-light leading-relaxed">
                Monte Carlo Dropout passes quantify reliability, detecting edge-case anomalies and providing clinicians with a mathematically robust trust score that signals when the AI is unsure.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4 text-sm font-bold text-primary-navy/40 uppercase tracking-widest font-mono">
                  <div className="w-8 h-px bg-black/10" /> MC-Dropout Samples
                </li>
                <li className="flex items-center gap-4 text-sm font-bold text-primary-navy/40 uppercase tracking-widest font-mono">
                  <div className="w-8 h-px bg-black/10" /> Entropy Metrics
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="pt-24 border-t border-black/5 grid grid-cols-2 lg:grid-cols-4 gap-12">
            <SpecItem index={0} label="Inference Mode" value="Real-time REST API" />
            <SpecItem index={1} label="Reliability" value="Entropy-Based Uncertainty" />
            <SpecItem index={2} label="Backend" value="PyTorch Engine" />
            <SpecItem index={3} label="Integration" value="Sync Data Pipeline" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="py-40 bg-white border-t border-black/5 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="space-y-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl space-y-8"
            >
              <span className="font-mono text-[10px] tracking-[0.5em] text-medical-blue uppercase font-black block">Clinical Ecosystem</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary-navy leading-[0.85] font-display">
                Built for the <br />
                <span className="text-medical-blue italic font-medium">future of radiology.</span>
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-sm"
            >
               <p className="text-lg text-on-surface font-sans leading-relaxed">
                Interdisciplinary applications designed to scale from academic research to high-volume clinical workflows.
               </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
             <EcosystemModule icon={BriefcaseMedical} number="01" title="Triage & Screening" description="Flag urgent cases in the radiology worklist automatically to prioritize critical scans for neuro-oncology." />
             <EcosystemModule icon={UserCheck} number="02" title="Decision Support" description="Provide clinicians with a reliable 'second opinion' backed by visual evidence and uncertainty metrics." />
             <EcosystemModule icon={GraduationCap} number="03" title="Educational Tool" description="Assist residents and medical students in understanding key anatomical features of tumor types through XAI heatmaps." />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white w-full py-12 border-t border-black/5">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-sans text-base font-bold tracking-tight text-primary-navy uppercase">NEURO-SCAN AI</span>
            <span className="text-[10px] font-mono font-black text-medical-blue tracking-[0.3em] uppercase mt-1">Advancing Trustworthy Medical AI</span>
          </div>
          <p className="text-on-surface-variant/40 text-[10px] tracking-widest uppercase font-mono">
            © {currentYear} NeuroScan Medical AI. For research and educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Main Landing Page Component ---

export default function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar onLaunch={onLaunch} />
      <main>
        <Hero onLaunch={onLaunch} />
        <ProjectUtility />
        <Features />
        <VisualInterpretation />
        <Ecosystem />
      </main>
      <Footer />
    </div>
  );
}
