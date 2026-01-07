
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SongFormData, GenerationResult, Producer } from './types';
import { PRODUCERS, RAPPERS, SINGERS } from './constants';
import { generateHit } from './geminiService';

// PDF and JSZip are available on window from script tags
declare const pdfjsLib: any;
declare const JSZip: any;

const App: React.FC = () => {
  const initialFormState: SongFormData = {
    producerId: PRODUCERS[0].id,
    rapperName: RAPPERS[0].name,
    singerName: SINGERS[0].name,
    topic: '',
    fileContext: '',
  };

  const [formData, setFormData] = useState<SongFormData>(initialFormState);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize PDF.js worker
  useEffect(() => {
    if (typeof pdfjsLib !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }, []);

  const groupedProducers = useMemo(() => {
    return PRODUCERS.reduce((acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    }, {} as Record<string, Producer[]>);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    setError(null);
    setUploadedFileName(file.name);

    try {
      let extractedText = "";

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }
        extractedText = fullText;
      } 
      else if (file.name.endsWith(".epub")) {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        let epubText = "";
        
        const fileEntries = Object.keys(zip.files).filter(name => 
          name.endsWith(".html") || name.endsWith(".xhtml")
        );

        for (const entryName of fileEntries) {
          const content = await zip.file(entryName).async("string");
          const doc = new DOMParser().parseFromString(content, "text/html");
          epubText += (doc.body.textContent || "") + "\n";
        }
        extractedText = epubText;
      } else {
        throw new Error("Unsupported file type. Please upload PDF or EPUB.");
      }

      setFormData(prev => ({ ...prev, fileContext: extractedText }));
    } catch (err: any) {
      setError("Failed to parse file: " + err.message);
      setUploadedFileName(null);
    } finally {
      setParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearFile = () => {
    setUploadedFileName(null);
    setFormData(prev => ({ ...prev, fileContext: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim() && !formData.fileContext) {
      setError("Provide a vibe or upload a document first.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await generateHit(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setResult(null);
    setError(null);
    setUploadedFileName(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center">
      <header className="w-full max-w-6xl mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 uppercase italic neon-text-purple">
          SUNO <span className="neon-text-cyan">GHOSTWRITER</span>
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.4em] text-xs font-bold">
          Professional Prompt Engine for AI Hitmakers
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-5">
          <div className="glass-card p-8 rounded-2xl neon-border h-full flex flex-col">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 neon-text-cyan">
              <i className="fas fa-sliders-h"></i> STUDIO CONSOLE
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
              <div>
                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Producer Style</label>
                <select 
                  className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all appearance-none cursor-pointer"
                  value={formData.producerId}
                  onChange={(e) => setFormData({...formData, producerId: e.target.value})}
                >
                  {(Object.entries(groupedProducers) as [string, Producer[]][]).map(([category, producers]) => (
                    <optgroup key={category} label={category.toUpperCase()} className="bg-black text-[#00f3ff] font-bold">
                      {producers.map(p => (
                        <option key={p.id} value={p.id} className="text-white bg-black">
                          {p.id}. {p.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Rapper</label>
                  <select 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all cursor-pointer"
                    value={formData.rapperName}
                    onChange={(e) => setFormData({...formData, rapperName: e.target.value})}
                  >
                    {RAPPERS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Singer</label>
                  <select 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all cursor-pointer"
                    value={formData.singerName}
                    onChange={(e) => setFormData({...formData, singerName: e.target.value})}
                  >
                    {SINGERS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400 flex justify-between">
                  Topic / Vibe 
                  {parsing && <span className="neon-text-cyan italic animate-pulse">Parsing Doc...</span>}
                </label>
                <div className="relative group">
                  <input 
                    type="text"
                    placeholder="Enter vibe or upload script..."
                    className="w-full bg-black border border-white/10 p-4 pr-16 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-500 hover:text-[#00f3ff] transition-colors"
                      title="Upload PDF/EPUB"
                    >
                      <i className="fas fa-file-upload text-xl"></i>
                    </button>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.epub"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {uploadedFileName && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="file-badge px-3 py-1 rounded-full text-[10px] font-bold text-[#bc13fe] flex items-center gap-2">
                      <i className="fas fa-file-contract"></i>
                      {uploadedFileName}
                      <button onClick={clearFile} className="hover:text-white transition-colors" aria-label="Remove file">
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={loading || parsing}
                  aria-busy={loading || parsing}
                  className={`w-full py-5 rounded-2xl btn-neon flex items-center justify-center gap-4 text-sm tracking-[0.2em] font-black group ${loading || parsing ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <i className="fas fa-compact-disc fa-spin text-2xl"></i>
                  ) : parsing ? (
                    <i className="fas fa-spinner fa-spin text-2xl"></i>
                  ) : (
                    <>
                      <i className="fas fa-play group-hover:scale-125 transition-transform"></i> GENERATE HIT
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white hover:border-white/30 transition-all"
                >
                  <i className="fas fa-redo-alt mr-2"></i> Reset Session
                </button>
              </div>
            </form>
            {error && (
              <p 
                aria-live="polite" 
                className="mt-6 text-red-500 text-[10px] font-black uppercase text-center tracking-tighter"
              >
                {error}
              </p>
            )}
          </div>
        </section>

        <section className="lg:col-span-7 flex flex-col gap-10">
          <div className="glass-card p-6 rounded-2xl neon-border">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 neon-text-cyan">
                <i className="fas fa-wave-square"></i> Style Prompt
              </h2>
              {result && (
                <button 
                  onClick={() => copyToClipboard(result.stylePrompt)}
                  className="text-[9px] font-black uppercase py-2 px-4 bg-white/5 hover:bg-[#00f3ff] hover:text-black rounded-lg transition-all"
                >
                  <i className="fas fa-copy mr-2"></i> Copy Style
                </button>
              )}
            </div>
            <div className="bg-black/50 border border-white/5 p-5 rounded-xl font-mono text-sm leading-relaxed text-[#00f3ff]/90 italic">
              {result ? result.stylePrompt : "Awaiting production parameters..."}
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl neon-border flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 neon-text-purple">
                <i className="fas fa-quote-right"></i> Generated Lyrics
              </h2>
              {result && (
                <button 
                  onClick={() => copyToClipboard(result.lyrics)}
                  className="text-[9px] font-black uppercase py-2 px-4 bg-white/5 hover:bg-[#bc13fe] hover:text-black rounded-lg transition-all"
                >
                  <i className="fas fa-copy mr-2"></i> Copy Lyrics
                </button>
              )}
            </div>
            <div className="flex-grow bg-black/50 border border-white/5 p-6 rounded-xl overflow-hidden relative">
               <textarea 
                readOnly
                className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                placeholder="The session hasn't started yet. Enter details on the console or upload a doc."
                value={result ? result.lyrics : ""}
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 py-8 w-full border-t border-white/5 text-center text-gray-600 text-[9px] font-black uppercase tracking-[0.5em]">
        &copy; 2024 SUNO GHOSTWRITER STUDIO // POWERED BY GEMINI PRO ENGINE
      </footer>
    </div>
  );
};

export default App;
