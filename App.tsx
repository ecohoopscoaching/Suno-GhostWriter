
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SongFormData, GenerationResult, Producer, PerformanceMode, Preset } from './types';
import { PRODUCERS, RAPPERS, SINGERS, PRESETS } from './constants';
import { generateHit } from './geminiService';

declare const pdfjsLib: any;
declare const JSZip: any;

const App: React.FC = () => {
  const initialFormState: SongFormData = {
    performanceMode: 'duet',
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
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof pdfjsLib !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }, []);

  const currentProducer = useMemo(() => PRODUCERS.find(p => p.id === formData.producerId), [formData.producerId]);
  const currentRapper = useMemo(() => RAPPERS.find(r => r.name === formData.rapperName), [formData.rapperName]);
  const currentSinger = useMemo(() => SINGERS.find(s => s.name === formData.singerName), [formData.singerName]);

  const groupedProducers = useMemo<Record<string, Producer[]>>(() => {
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
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += (textContent.items as any[]).map((item: any) => item.str).join(" ") + "\n";
        }
        extractedText = fullText;
      } else if (file.name.endsWith(".epub")) {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        let epubText = "";
        const files = Object.keys(zip.files).filter(n => n.endsWith(".html") || n.endsWith(".xhtml"));
        for (const f of files) {
          const content = await zip.file(f).async("string");
          const doc = new DOMParser().parseFromString(content, "text/html");
          epubText += (doc.body.textContent || "") + "\n";
        }
        extractedText = epubText;
      }
      setFormData(prev => ({ ...prev, fileContext: extractedText }));
    } catch (err: any) {
      setError("Failed to parse document: " + err.message);
      setUploadedFileName(null);
    } finally {
      setParsing(false);
    }
  };

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset.id);
    setFormData(prev => ({
      ...prev,
      ...preset.config
    }));
    // Visual feedback
    const originalError = error;
    setError(`LOADED PRESET: ${preset.name.toUpperCase()}`);
    setTimeout(() => setError(originalError === `LOADED PRESET: ${preset.name.toUpperCase()}` ? null : originalError), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim() && !formData.fileContext) {
      setError("Provide a topic or upload context first.");
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
    setActivePreset(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setPerformanceMode = (mode: PerformanceMode) => {
    setActivePreset(null);
    setFormData(prev => ({ ...prev, performanceMode: mode }));
  };

  return (
    <div className="min-h-screen p-4 md:p-12 flex flex-col items-center bg-[#050505]">
      <header className="w-full max-w-6xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase italic neon-text-purple">
          SUNO <span className="neon-text-cyan">GHOSTWRITER</span>
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.4em] text-xs font-bold">
          High-Performance Rapper & Producer Engine for AI Classics
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-5 flex flex-col gap-8">
          <div className="glass-card p-8 rounded-2xl neon-border h-full flex flex-col relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3 neon-text-cyan">
                <i className="fas fa-sliders-h"></i> STUDIO CONSOLE
              </h2>
              <button 
                onClick={handleReset}
                title="Reset Studio"
                className="text-gray-500 hover:text-red-500 transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2"
              >
                <i className="fas fa-undo-alt"></i> RESET
              </button>
            </div>

            {/* Studio Presets Section */}
            <div className="mb-8">
              <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Studio Presets</label>
              <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`flex-shrink-0 w-32 p-3 rounded-xl border transition-all text-left ${activePreset === preset.id ? 'border-[#bc13fe] bg-[#bc13fe]/10' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                  >
                    <div className={`text-[10px] font-black uppercase mb-1 ${activePreset === preset.id ? 'text-[#bc13fe]' : 'text-white'}`}>{preset.name}</div>
                    <div className="text-[8px] text-gray-500 leading-tight lowercase line-clamp-2">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
              <div>
                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Performance Mode</label>
                <div className="grid grid-cols-3 gap-2 bg-black border border-white/10 p-1 rounded-xl">
                  {(['duet', 'solo_rap', 'solo_singer'] as PerformanceMode[]).map(mode => (
                    <button 
                      key={mode}
                      type="button"
                      onClick={() => setPerformanceMode(mode)}
                      className={`py-2 text-[9px] font-black uppercase rounded-lg transition-all ${formData.performanceMode === mode ? 'bg-[#bc13fe] text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Producer Style</label>
                <select 
                  className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all appearance-none cursor-pointer"
                  value={formData.producerId}
                  onChange={(e) => { setFormData({...formData, producerId: e.target.value}); setActivePreset(null); }}
                >
                  {(Object.entries(groupedProducers) as [string, Producer[]][]).map(([category, producers]) => (
                    <optgroup key={category} label={category.toUpperCase()} className="bg-black text-[#00f3ff] font-bold">
                      {producers.map(p => (
                        <option key={p.id} value={p.id} className="text-white bg-black">
                          {p.id}: {p.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {currentProducer && (
                  <div className="mt-2 text-[9px] text-[#00f3ff] italic font-medium leading-tight uppercase opacity-80">
                    {currentProducer.style}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={formData.performanceMode === 'solo_singer' ? 'opacity-30 pointer-events-none' : ''}>
                  <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Rapper</label>
                  <select 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all cursor-pointer"
                    value={formData.rapperName}
                    onChange={(e) => { setFormData({...formData, rapperName: e.target.value}); setActivePreset(null); }}
                  >
                    {RAPPERS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                  </select>
                  {currentRapper && (
                    <div className="mt-2 text-[9px] text-[#bc13fe] italic font-medium leading-tight uppercase opacity-80">
                      {currentRapper.tag.replace('[', '').replace(']', '')}
                    </div>
                  )}
                </div>
                <div className={formData.performanceMode === 'solo_rap' ? 'opacity-30 pointer-events-none' : ''}>
                  <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400">Singer</label>
                  <select 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all cursor-pointer"
                    value={formData.singerName}
                    onChange={(e) => { setFormData({...formData, singerName: e.target.value}); setActivePreset(null); }}
                  >
                    {SINGERS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                  {currentSinger && (
                    <div className="mt-2 text-[9px] text-[#bc13fe] italic font-medium leading-tight uppercase opacity-80">
                      {currentSinger.tag.replace('[', '').replace(']', '')}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest text-gray-400 flex justify-between">
                  Topic / Vibe 
                  {parsing && <span className="neon-text-cyan italic animate-pulse">Parsing...</span>}
                </label>
                <div className="relative group">
                  <input 
                    type="text"
                    placeholder="Enter topic or upload doc..."
                    className="w-full bg-black border border-white/10 p-4 pr-16 rounded-xl text-white focus:outline-none focus:border-[#00f3ff] transition-all"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-500 hover:text-[#00f3ff] transition-colors"
                    >
                      <i className="fas fa-file-upload text-xl"></i>
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.epub" onChange={handleFileUpload} />
                  </div>
                </div>
                {uploadedFileName && (
                  <div className="mt-3 file-badge px-3 py-1 rounded-full text-[10px] font-bold text-[#bc13fe] flex items-center gap-2">
                    <i className="fas fa-file-contract"></i>
                    {uploadedFileName}
                    <button onClick={() => { setUploadedFileName(null); setFormData(f => ({...f, fileContext: ''})); }}>
                      <i className="fas fa-times-circle"></i>
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading || parsing}
                className={`w-full py-5 rounded-2xl btn-neon flex items-center justify-center gap-4 text-sm tracking-[0.2em] font-black ${loading || parsing ? 'opacity-50 grayscale' : ''}`}
              >
                {loading ? <i className="fas fa-compact-disc fa-spin text-2xl"></i> : <><i className="fas fa-play"></i> GENERATE HIT</>}
              </button>
            </form>
            {error && <p className="mt-6 text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
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
                  onClick={() => navigator.clipboard.writeText(result.stylePrompt)}
                  className="text-[9px] font-black uppercase py-2 px-4 bg-white/5 hover:bg-[#00f3ff] hover:text-black rounded-lg transition-all"
                >Copy Style</button>
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
                  onClick={() => navigator.clipboard.writeText(result.lyrics)}
                  className="text-[9px] font-black uppercase py-2 px-4 bg-white/5 hover:bg-[#bc13fe] hover:text-black rounded-lg transition-all"
                >Copy Lyrics</button>
              )}
            </div>
            <textarea 
              readOnly
              className="w-full flex-grow bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
              placeholder="The ghostwriter is standing by..."
              value={result ? result.lyrics : ""}
              style={{ minHeight: '450px' }}
            />
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 w-full border-t border-white/5 text-center text-gray-600 text-[9px] font-black uppercase tracking-[0.5em]">
        &copy; 2024 SUNO GHOSTWRITER // POWERED BY GEMINI PRO
      </footer>
    </div>
  );
};

export default App;
