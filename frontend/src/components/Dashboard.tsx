import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Eye, Activity, ScrollText, 
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Navbar, Footer } from "./LandingPage";

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Backend response:", data);
      setResult(data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-primary-navy font-sans selection:bg-medical-blue/30 flex flex-col">
      <Navbar onLaunch={onBack} launchLabel="Back" />

      <main className="flex-grow pt-24 sm:pt-32 px-4 md:px-12 max-w-screen-2xl mx-auto pb-20 w-full">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-[10px] font-mono font-black text-medical-blue uppercase tracking-[0.3em] hover:opacity-60 transition-all"
            >
              <div className="w-4 h-px bg-medical-blue group-hover:w-6 transition-all" /> Return to Research Portal
            </button>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-display">Screening <span className="text-medical-blue italic font-medium">Protocol.</span></h1>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Upload & Report */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            {/* Upload Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative group border border-black/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-center transition-all duration-700
                ${file ? 'bg-white clinical-glow' : 'bg-surface-container hover:bg-white hover:clinical-glow'}`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              <div className="space-y-8">
                <div className="w-24 h-24 bg-white shadow-sm border border-black/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-700">
                  <Upload className={file ? "text-medical-blue" : "text-primary-navy/20"} size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">
                    {file ? file.name : "Acquire MRI Sequence"}
                  </h3>
                  <p className="text-on-surface-variant font-light text-sm italic">
                    DICOM compliance verified (JPEG, PNG, DICOM)
                  </p>
                </div>
              </div>

              <AnimatePresence>
              {file && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-10 overflow-hidden"
                  >
                    <button
                      onClick={handleUpload}
                      disabled={loading}
                      className="w-full py-5 bg-primary-navy hover:bg-medical-blue disabled:bg-black/5 text-white rounded-2xl font-bold transition-all shadow-xl shadow-primary-navy/10 flex items-center justify-center gap-4 uppercase tracking-widest text-xs z-30 relative"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Activity size={18} />}
                      {loading ? "Computing Tensors..." : "Initiate Structural Analysis"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Findings Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-black/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-medical-blue/5 rounded-2xl">
                  <ScrollText className="text-medical-blue w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display tracking-tight">Automated Findings</h3>
              </div>
              <div className="p-8 bg-surface-container rounded-3xl border border-black/[0.02] min-h-[160px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-medical-blue/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-medical-blue/10 transition-colors" />
                {result ? (
                  <p className="text-on-surface-variant leading-relaxed font-light relative z-10">{result.report}</p>
                ) : (
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="h-2 w-3/4 bg-black/5 rounded-full" />
                    <div className="h-2 w-full bg-black/5 rounded-full" />
                    <div className="h-2 w-1/2 bg-black/5 rounded-full" />
                    <p className="text-primary-navy/20 font-mono text-[10px] font-black uppercase tracking-[0.2em] mt-4">Waiting for data stream...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visualization & Diagnostics */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {/* Visualization Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-black/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 clinical-glow"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Input Stream */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <span className="font-mono text-[10px] font-black text-primary-navy/20 uppercase tracking-[0.2em]">Source Input</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-black/10" />
                      <div className="w-1 h-1 rounded-full bg-black/10" />
                    </div>
                  </div>
                  <div className="aspect-square bg-surface-container rounded-[2rem] border border-black/5 overflow-hidden group relative">
                    {preview ? (
                      <img src={preview} alt="Input" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary-navy/10 font-mono text-[10px] font-black uppercase tracking-widest">Null Signal</span>
                      </div>
                    )}
                    <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
                  </div>
                </div>

                {/* Heatmap Stream */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <span className="font-mono text-[10px] font-black text-medical-blue uppercase tracking-[0.2em]">Structural XAI</span>
                    {result && <span className="w-2 h-2 rounded-full bg-medical-blue animate-pulse" />}
                  </div>
                  <div className="aspect-square bg-surface-container rounded-[2rem] border border-medical-blue/10 overflow-hidden relative group">
                    {result ? (
                      <img 
                      src={`http://127.0.0.1:5000${result.gradcam}?t=${Date.now()}`}
                        alt="Neural Explanation" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                        <div className="w-12 h-12 border border-primary-navy/10 border-dashed rounded-full animate-spin duration-[4000ms]" />
                        <span className="text-[9px] font-mono font-black text-primary-navy/10 uppercase tracking-[0.4em]">Inert Engine</span>
                      </div>
                    )}
                    <div className="absolute inset-0 border-[20px] border-medical-blue/5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Diagnostic Modules */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-black/5 rounded-[2.5rem] p-10 flex flex-col justify-between clinical-glow"
              >
                <div className="space-y-6">
                  <div className="p-3 bg-medical-blue/5 rounded-2xl w-fit">
                    <Activity className="text-medical-blue w-6 h-6" />
                  </div>
                  <h3 className="font-display font-medium text-lg text-primary-navy/60">Molecular Identity</h3>
                </div>
                <div className="mt-12">
                  {result ? (
                    <div className="space-y-4">
                      <p className="text-4xl font-bold tracking-tighter text-medical-blue font-display uppercase">{result.prediction}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-medical-blue/5 rounded-full">
                        <CheckCircle2 size={12} className="text-medical-blue" />
                        <span className="font-mono text-[9px] font-black text-medical-blue uppercase tracking-widest">Model Confirmed</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-10 w-2/3 bg-black/5 rounded-lg animate-pulse" />
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-navy rounded-[2.5rem] p-10 text-white flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="p-3 bg-white/5 rounded-2xl w-fit">
                    <AlertCircle className="text-medical-blue w-6 h-6" />
                  </div>
                  <h3 className="font-display font-medium text-lg text-white/60 text-xs tracking-widest uppercase">Confidence Indices</h3>
                </div>
                <div className="mt-12 space-y-6">
                  {result ? (
                    <>
                      <StatBar 
                        label="Reliability" 
                        value={result.confidence * 100} 
                        color="bg-medical-blue" 
                        isDark 
                      />
                      <StatBar 
                        label="Entropy" 
                        value={Math.min(result.uncertainty * 100, 100)}
                        color="bg-white/20" 
                        isDark 
                      />
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="h-1.5 w-full bg-white/10 rounded-full" />
                      <div className="h-1.5 w-full bg-white/10 rounded-full" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatBar({ label, value, color, isDark }: { label: string, value: number, color: string, isDark?: boolean }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-mono">
        <span className={isDark ? "text-white/40" : "text-primary-navy/40"}>{label}</span>
        <span className={isDark ? "text-white" : "text-primary-navy"}>{value.toFixed(1)}%</span>
      </div>
      <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-surface-container'}`}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${color} ${isDark && color === 'bg-medical-blue' ? 'shadow-[0_0_15px_rgba(14,165,233,0.5)]' : ''}`}
        />
      </div>
    </div>
  );
}

