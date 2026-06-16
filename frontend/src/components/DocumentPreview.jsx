import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, ShieldAlert } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function DocumentPreview({ doc, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  
  // State tracking for local vector signature positions
  const [signatures, setSignatures] = useState([
    { id: 'mock-1', x: 120, y: 350, page: 1, signerName: 'Anutosh Ray' }
  ]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // Intercept cursor clicks to track exact dynamic local page coordinates
  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Exact pixel delta offset x
    const clickY = e.clientY - rect.top;  // Exact pixel delta offset y

    const newPlacement = {
      id: Date.now().toString(),
      x: clickX,
      y: clickY,
      page: pageNumber,
      signerName: 'Authorized Signer'
    };

    setSignatures([...signatures, newPlacement]);
    console.log(`Coordinate matrix locked: X=${clickX.toFixed(2)}px, Y=${clickY.toFixed(2)}px`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 font-mono">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header Configuration Panel */}
        <div className="flex justify-between items-center bg-slate-900/90 border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-slate-200 tracking-wider truncate max-w-md">{doc.fileName}</h2>
            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-0.5">Click on page layer to position vector digital ink</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
              <button onClick={() => setScale(prev => Math.max(prev - 0.2, 0.6))} className="p-1.5 hover:bg-slate-800 text-slate-400 rounded"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-mono px-2 text-slate-300">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(prev => Math.min(prev + 0.2, 2.0))} className="p-1.5 hover:bg-slate-800 text-slate-400 rounded"><ZoomIn className="w-4 h-4" /></button>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-950 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 rounded-lg transition-all"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Dynamic Relative Vector Target Viewport */}
        <div className="flex-1 overflow-auto bg-slate-950 flex justify-center items-start p-6 custom-scrollbar">
          <div 
            onClick={handlePageClick}
            className="shadow-2xl border border-slate-800 rounded-lg bg-slate-900 p-2 relative cursor-crosshair select-none overflow-hidden group"
          >
            <Document
              file="https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="text-xs text-cyan-400 font-bold uppercase tracking-widest py-20 animate-pulse">Initializing Vector Engine...</div>}
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                className="overflow-hidden rounded"
              />
            </Document>

            {/* --- RENDERING INTERACTIVE POSITION PLACEHOLDERS OVER PDF EXTENT LAYER --- */}
            {signatures
              .filter(sig => sig.page === pageNumber)
              .map((sig) => (
                <div
                  key={sig.id}
                  className="absolute p-2.5 rounded border flex flex-col pointer-events-none select-none transition-all duration-300 font-sans"
                  style={{
                    left: `${sig.x}px`,
                    top: `${sig.y}px`,
                    transform: 'translate(-50%, -50%)', // Anchor placement exactly over cursor coordinate dot
                    backgroundColor: 'rgba(0, 255, 204, 0.08)',
                    borderColor: '#00ffcc',
                    boxShadow: '0 0 15px rgba(0, 255, 204, 0.4)'
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[9px] uppercase tracking-widest font-black text-cyan-400">Digital Ink Anchor</span>
                  </div>
                  <span className="text-slate-200 text-xs font-bold mt-1 font-mono tracking-tight">{sig.signerName}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Page Traversal Footer Controller */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Page <span className="text-cyan-400 font-mono">{pageNumber}</span> of <span className="text-slate-200 font-mono">{numPages || '?'}</span>
          </p>
          <div className="flex gap-2">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(prev => prev - 1)}
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> PREV LAYER
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(prev => prev + 1)}
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-40 transition-all"
            >
              NEXT LAYER <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}