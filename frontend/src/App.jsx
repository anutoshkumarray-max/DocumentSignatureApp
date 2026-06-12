import React, { useState } from 'react';
import { FileSignature, Shield, Zap, ArrowRight, UploadCloud, CheckCircle2, Sparkles, Code, Terminal, Layers } from 'lucide-react';

export default function App() {
  const [isEngaged, setIsEngaged] = useState(false);

  return (
    <div className="w-full min-h-screen text-white relative cyber-grid font-mono flex flex-col justify-between p-6" style={{ backgroundColor: '#02040a' }}>
      
      {/* --- HYPER-SATURATED BACKGROUND LIGHT GLOWS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 mix-blend-screen filter blur-[120px]" style={{ background: 'radial-gradient(circle, #bd00ff 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 mix-blend-screen filter blur-[120px]" style={{ background: 'radial-gradient(circle, #00ffcc 0%, transparent 70%)' }} />

      {/* --- HEADER NAVBAR --- */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between relative z-50 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <FileSignature size={24} style={{ color: '#00ffcc' }} />
          </div>
          <div>
            <span className="text-xl font-black tracking-widest text-white block">DOC<span style={{ color: '#00ffcc' }}>SIGNER</span></span>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest block uppercase">Day 1 Core Terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00ffcc', boxShadow: '0 0 10px #00ffcc' }} />
            <span className="text-slate-300">COMPILER STACK ONLINE</span>
          </div>
        </div>
      </header>

      {/* --- CORE INTERACTIVE PLATFORM CANVAS --- */}
      <main className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 relative z-10">
        
        {/* Left Descriptive Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-black tracking-widest rounded-lg uppercase" style={{ color: '#00ffcc', backgroundColor: 'rgba(0,255,204,0.1)', border: '1px solid rgba(0,255,204,0.2)' }}>
            <Terminal size={12} /> Sandbox Subsystem Operational
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Asymmetric <br />
            <span className="bg-gradient-to-r from-[#00ffcc] via-[#0066ff] to-[#bd00ff] bg-clip-text text-transparent">
              Signature
            </span> <br />
            Pipelines.
          </h1>
          
          <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed max-w-md">
            Deploy dynamic document hashing workflows across automated file environments. Engineered with frosted glassmorphic elements to reset premium interface benchmarks.
          </p>

          <div className="pt-2">
            <button className="px-6 py-3.5 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300" style={{ border: '1px solid #00ffcc', color: '#00ffcc', backgroundColor: 'rgba(0,255,204,0.03)' }}>
              Initialize Repo Environment
            </button>
          </div>
        </div>

        {/* Right Fluid Execution Block */}
        <div className="lg:col-span-6 flex items-center justify-center w-full relative">
          <div 
            className="w-full max-w-md rounded-3xl p-8 shadow-2xl relative transition-all duration-300 border"
            style={{ 
              backgroundColor: 'rgba(13,21,41,0.6)', 
              borderColor: isEngaged ? '#00ffcc' : 'rgba(255,255,255,0.1)'
            }}
            onMouseEnter={() => setIsEngaged(true)}
            onMouseLeave={() => setIsEngaged(false)}
          >
            {/* Inner Top Meta Row */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl text-white" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Code size={14} style={{ color: '#00ffcc' }} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Upload Target Module</span>
              </div>
              <span className="text-[9px] font-black px-2 py-0.5 rounded text-white tracking-widest" style={{ backgroundColor: '#bd00ff' }}>MERN SETUP</span>
            </div>

            {/* Asymmetric Dropzone Shell */}
            <div className="border rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer" style={{ borderStyle: 'dashed', backgroundColor: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="p-4 rounded-2xl w-fit mx-auto text-white mb-4" style={{ backgroundColor: '#02040a', border: '1px solid rgba(255,255,255,0.08)' }}>
                <UploadCloud size={24} style={{ color: '#00ffcc' }} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Stream Source PDF Document</h4>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Capacities verified up to 25MB scale logs</p>
            </div>

            {/* Matrix Splits */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <CheckCircle2 size={12} style={{ color: '#00ffcc' }} />
                <span>Ink Vectors</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Layers size={12} style={{ color: '#bd00ff' }} />
                <span>Vault Hashes</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* --- HARDWARE BASE LINE FOOTER --- */}
      <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">© 2026 DocSigner Workspace Terminal. Day 1 System Solidified.</p>
        <div className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00ffcc', boxShadow: '0 0 8px #00ffcc' }} /> TAILWIND ACTIVE</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#bd00ff', boxShadow: '0 0 8px #bd00ff' }} /> MONGO PIPELINE</span>
        </div>
      </footer>

    </div>
  );
}