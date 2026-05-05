import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Eye, Activity, ScrollText, ChevronLeft, 
  CheckCircle2, AlertCircle, Loader2, BrainCircuit
} from 'lucide-react';
import { useState, useCallback } from "react";

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null); // Reset results on new upload
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
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 h-16 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex items-center px-8 justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-cyan-400 w-6 h-6" />
          <span className="text-xl font-black tracking-tighter text-white font-display">NEURO<span className="text-cyan-400">SCAN</span></span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} /> Exit Portal
        </button>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto pb-20 relative z-10">
        
        {/* Upload Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className={`relative group border-2 border-dashed transition-all duration-300 rounded-2xl p-8 text-center 
              ${file ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}`}>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className={file ? "text-cyan-400" : "text-slate-400"} />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">
                    {file ? file.name : "Upload MRI Scan"}
                  </p>
                  <p className="text-sm text-slate-400">Drag and drop or click to browse (DICOM, JPG, PNG)</p>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {file && !result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex justify-center"
                >
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Activity size={18} />}
                    {loading ? "ANALYZING..." : "BEGIN NEURAL ANALYSIS"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Imaging Panel */}
          <motion.div layout className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Eye className="text-cyan-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Imaging Visualization</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Input Frame</span>
                  <div className="aspect-square bg-slate-950 rounded-xl border border-white/5 overflow-hidden">
                    {preview ? (
                      <img src={preview} alt="Input" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700 italic text-sm">Waiting for input...</div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">Neural Heatmap (Grad-CAM)</span>
                  <div className="aspect-square bg-slate-950 rounded-xl border border-cyan-500/20 overflow-hidden relative">
                    {result ? (
                      <img 
                        src={`http://127.0.0.1:5000${result.gradcam}`} 
                        alt="Analysis" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-2">
                        <div className="w-8 h-8 border-2 border-slate-800 border-dashed rounded-full animate-spin" />
                        <span className="text-sm">Awaiting Analysis</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Report */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <ScrollText className="text-purple-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Automated Clinical Findings</h3>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 min-h-[100px]">
                {result ? (
                  <p className="text-slate-300 leading-relaxed font-mono text-sm">{result.report}</p>
                ) : (
                  <p className="text-slate-600 italic">Report will be generated upon scan completion.</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Intelligence Side Panel */}
          <motion.div layout className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Activity className="text-amber-400 w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Diagnostics</h3>
              </div>

              {result ? (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Primary Classification</span>
                    <p className="text-4xl font-black text-cyan-400 mt-1">{result.prediction}</p>
                  </div>

                  <div className="space-y-6">
                    <StatBar 
                      label="Confidence Score" 
                      value={result.confidence * 100} 
                      color="bg-cyan-500" 
                    />
                    <StatBar 
                      label="Uncertainty Index" 
                      value={result.uncertainty * 100} 
                      color="bg-amber-500" 
                    />
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 size={16} />
                      Verified by AI Analytics
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <AlertCircle className="mx-auto text-slate-700 w-12 h-12" />
                  <p className="text-slate-500 text-sm">No diagnostic data available.<br/>Please upload a scan.</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color} shadow-[0_0_8px_rgba(34,211,238,0.4)]`}
        />
      </div>
    </div>
  );
}