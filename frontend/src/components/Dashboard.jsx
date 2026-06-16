import React, { useState, useEffect } from 'react';
import { FileText, Upload, Eye, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard({ onSelectDoc }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all document tracking vectors registered to authenticated user
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // Mocking array matching backend entity definitions for UI simulation
        const sampleDocs = [
          { _id: '1', fileName: 'NDA_Agreement_Final.pdf', fileSize: 1024500, status: 'Pending', createdAt: new Date().toISOString() },
          { _id: '2', fileName: 'Offer_Letter_Signed.pdf', fileSize: 2450000, status: 'Signed', createdAt: new Date().toISOString() }
        ];
        setDocuments(sampleDocs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching structural metadata assets', error);
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-cyan-500/30">
      {/* Header Profile Dashboard Layer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Workspace Console
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage, audit, and sign your operational document arrays.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95">
          <Upload className="w-5 h-5 stroke-[2.5]" />
          Upload New PDF
        </button>
      </div>

      {/* Main Grid View Container */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl p-16 text-center max-w-2xl mx-auto backdrop-blur-sm bg-slate-900/20">
          <FileText className="w-16 h-16 text-slate-600 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-300">No Document Streams Active</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-xs">Upload your first PDF payload to initialize signature workspace operations.</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-slate-800 rounded-xl bg-slate-900/40 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Document Details</th>
                <th className="py-4 px-6">Size Parameters</th>
                <th className="py-4 px-6">Security Status</th>
                <th className="py-4 px-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {documents.map((doc) => (
                <tr key={doc._id} className="hover:bg-slate-800/30 transition-colors duration-150 group">
                  <td className="py-4 px-6 font-medium text-slate-200 flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-cyan-500/40 transition-colors duration-200">
                      <FileText className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="truncate max-w-xs block">{doc.fileName}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{formatBytes(doc.fileSize)}</td>
                  <td className="py-4 px-6">
                    {doc.status === 'Signed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" /> Securely Signed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                        <Clock className="w-3.5 h-3.5" /> Pending Execution
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => onSelectDoc(doc)}
                      className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-lg font-medium transition-all duration-150"
                    >
                      <Eye className="w-4 h-4" /> Preview View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}