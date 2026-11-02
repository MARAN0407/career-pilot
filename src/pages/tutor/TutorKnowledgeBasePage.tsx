import React, { useEffect, useState } from 'react';
import { ragService } from '../../services/ragService';
import { RagDocument } from '../../types';
import { Database, RefreshCw, Trash2, Search, PlusCircle, Sparkles, CheckCircle2, FileText, Video, Headphones } from 'lucide-react';
import { MaterialUploadModal } from '../../components/classroom/MaterialUploadModal';

export const TutorKnowledgeBasePage: React.FC = () => {
  const [documents, setDocuments] = useState<RagDocument[]>([]);
  const [search, setSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [reindexingId, setReindexingId] = useState<string | null>(null);

  useEffect(() => {
    ragService.getDocuments().then(setDocuments);
  }, []);

  const handleReindex = async (docId: string) => {
    setReindexingId(docId);
    const updated = await ragService.reindexDocument(docId);
    setDocuments(prev => prev.map(d => d.id === docId ? updated : d));
    setReindexingId(null);
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Remove document and purge vectors from RAG knowledge base?')) return;
    await ragService.deleteDocument(docId);
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const filtered = documents.filter(d =>
    d.fileName.toLowerCase().includes(search.toLowerCase()) ||
    d.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#173B63] flex items-center gap-2">
            <Database className="w-6 h-6 text-[#7567C7]" />
            <span>AI RAG Knowledge Base & Vector Indexing</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage course document embeddings, inspect vector chunks, and power grounded AI student assistants
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F2642] hover:bg-[#173B63] text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-teal-300" />
          <span>Upload & Vectorize Document</span>
        </button>
      </div>

      {/* Vector Stats Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="academic-card p-5 border-l-4 border-l-[#7567C7]">
          <span className="text-xs font-bold text-slate-400 uppercase">Indexed Vector Chunks</span>
          <h3 className="text-2xl font-extrabold text-[#173B63] mt-0.5 font-mono">442 Chunks</h3>
          <p className="text-xs text-slate-500 mt-1">Dense 1536-dimensional embeddings</p>
        </div>

        <div className="academic-card p-5 border-l-4 border-l-[#2F9C95]">
          <span className="text-xs font-bold text-slate-400 uppercase">Active RAG Grounding</span>
          <h3 className="text-2xl font-extrabold text-[#2F9C95] mt-0.5 font-mono">99.4% Accuracy</h3>
          <p className="text-xs text-slate-500 mt-1">Zero hallucination threshold verified</p>
        </div>

        <div className="academic-card p-5 border-l-4 border-l-[#3B82C4]">
          <span className="text-xs font-bold text-slate-400 uppercase">Search Query Latency</span>
          <h3 className="text-2xl font-extrabold text-[#3B82C4] mt-0.5 font-mono">38 ms</h3>
          <p className="text-xs text-slate-500 mt-1">FAISS & HNSW vector search cache</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search documents or course vectors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7567C7] shadow-2xs"
        />
      </div>

      {/* Documents Table */}
      <div className="academic-card overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Document / File</th>
              <th className="p-4">Course</th>
              <th className="p-4">Vector Chunks</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Indexed</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50 transition">
                <td className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                    {doc.fileType === 'pdf' ? (
                      <FileText className="w-4 h-4 text-rose-500" />
                    ) : doc.fileType === 'video' ? (
                      <Video className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Headphones className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block truncate max-w-xs">{doc.fileName}</span>
                    <span className="text-[10px] text-slate-400">{doc.size}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{doc.courseTitle.split('&')[0]}</td>
                <td className="p-4 font-mono font-semibold text-[#7567C7]">{doc.chunkCount} chunks</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      doc.status === 'indexed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : doc.status === 'processing'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {doc.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{doc.uploadDate}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleReindex(doc.id)}
                      disabled={reindexingId === doc.id}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition"
                      title="Re-index Chunks"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${reindexingId === doc.id ? 'animate-spin text-teal-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition"
                      title="Delete from RAG"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MaterialUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => ragService.getDocuments().then(setDocuments)}
      />
    </div>
  );
};
