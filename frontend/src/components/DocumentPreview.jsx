import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Inject worker parameters to maintain isolated rendering processing
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function DocumentPreview({ doc, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Controller Action Ribbon Header */}
        <div className="flex justify-between items-center bg-slate-900/90 border-b border-slate-800 px-6 py-4">
          <div className="truncate max-w-md">
            <h2 className="text-base font-bold text-slate-200 truncate">{doc.fileName}</h2>
            <p className="text-xs text-slate-400">Preview Engine Mode</p>
          </div>
          
          {/* Zoom & Close Interactive Parameter Containers */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
              <button onClick={() => setScale(prev => Math.max(prev - 0.2, 0.6))} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
              <span className="text-xs font-mono px-2 text-slate-300">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(prev => Math.min(prev + 0.2, 2.0))} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-950 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 rounded-lg transition-all duration-150"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Dynamic Vector Core Document Render Area */}
        <div className="flex-1 overflow-auto bg-slate-950 flex justify-center items-start p-6 custom-scrollbar">
          <div className="shadow-2xl border border-slate-800 rounded-lg bg-slate-900 p-2 select-none">
            {/* Fallback mock source structure to demonstrate layout execution paths safely */}
            <Document
              file="https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="text-sm text-cyan-400 animate-pulse font-medium py-20">Loading document structures...</div>}
              error={<div className="text-sm text-red-400 font-medium py-20">Error rendering PDF binary object streams.</div>}
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                className="overflow-hidden rounded"
              />
            </Document>
          </div>
        </div>

        {/* Footer Vector Tracking Array Controllers */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-400">
            Page <span className="text-slate-200 font-mono">{pageNumber}</span> of <span className="text-slate-200 font-mono">{numPages || '?'}</span>
          </p>
          <div className="flex gap-2">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(prev => prev - 1)}
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-40 disabled:hover:text-slate-300 disabled:hover:border-slate-800 transition-all duration-150"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(prev => prev + 1)}
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-40 disabled:hover:text-slate-300 disabled:hover:border-slate-800 transition-all duration-150"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}