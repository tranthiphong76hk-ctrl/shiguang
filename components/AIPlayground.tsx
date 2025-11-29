import React, { useState } from 'react';
import { generateThinkingResponse, generateFastResponse, generateImage, generateVideo, searchGrounding } from '../services/geminiService';
import { Loader2, Video, Image as ImageIcon, BrainCircuit, Zap, Search } from 'lucide-react';

const AIPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'visualize' | 'search'>('plan');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix for API usage if needed, but display usually needs it
        // The service expects just the base64 bytes for some calls, but let's store full string and parse in service
        setUploadedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const executeAI = async () => {
    if (!prompt && activeTab !== 'visualize') return;
    setLoading(true);
    setResult(null);
    setGroundingLinks([]);

    try {
      if (activeTab === 'plan') {
        // Use Thinking Model for complex planning
        const response = await generateThinkingResponse(
          `Act as a senior educational consultant. Create a detailed, innovative 3-day winter camp itinerary based on this request: "${prompt}". Focus on logistical feasibility and educational value.`
        );
        setResult(response);
      } else if (activeTab === 'visualize') {
        // Video Generation
        // Strip header from base64 if present for the service
        const rawBase64 = uploadedImage ? uploadedImage.split(',')[1] : undefined;
        const videoUrl = await generateVideo(prompt, videoAspectRatio, rawBase64);
        setResult(videoUrl);
      } else if (activeTab === 'search') {
        const searchRes = await searchGrounding(prompt);
        setResult(searchRes.text);
        setGroundingLinks(searchRes.links);
      }
    } catch (e) {
      setResult(`Error: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const executeFast = async () => {
     if (!prompt) return;
     setLoading(true);
     setResult(null);
     try {
         const res = await generateFastResponse(prompt);
         setResult(res);
     } catch(e) {
         setResult(`Error: ${(e as Error).message}`);
     } finally {
         setLoading(false);
     }
  }

  const executeImageGen = async () => {
      if(!prompt) return;
      setLoading(true);
      setResult(null);
      try {
          const url = await generateImage(prompt, imageSize);
          setResult(url);
      } catch(e) {
        setResult(`Error: ${(e as Error).message}`);
      } finally {
        setLoading(false);
      }
  }

  return (
    <section className="py-16 bg-shiyuan-dark text-shiyuan-light relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-serif text-shiyuan-gold mb-4">研学未来实验室</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            体验诗远研学的科技创新能力。利用Google Gemini 3.0与Veo模型，为您的学生定制独一无二的研学方案与视觉体验。
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeTab === 'plan' ? 'bg-shiyuan-gold text-shiyuan-dark font-bold' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <BrainCircuit size={18} /> 智能策划 (Thinking)
            </button>
            <button
              onClick={() => setActiveTab('visualize')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeTab === 'visualize' ? 'bg-shiyuan-gold text-shiyuan-dark font-bold' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Video size={18} /> 视觉生成 (Veo/Imagen)
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeTab === 'search' ? 'bg-shiyuan-gold text-shiyuan-dark font-bold' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Search size={18} /> 实时趋势 (Search)
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm text-shiyuan-gold font-semibold uppercase tracking-wider">
                    {activeTab === 'plan' ? '输入研学需求' : activeTab === 'visualize' ? '描述画面或上传图片' : '查询研学热点'}
                </label>
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                    activeTab === 'plan' 
                    ? "例如：为深圳初中生设计一个杭州3天AI研学行程，包含浙大参访..." 
                    : activeTab === 'visualize'
                    ? "例如：一群学生在西湖边吟诗作画，电影感，夕阳..."
                    : "例如：2025年中国青少年研学旅行的最新政策和趋势..."
                }
                className="w-full bg-black/20 border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-shiyuan-gold h-32 resize-none"
                />
            </div>

            {activeTab === 'visualize' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs text-shiyuan-gold">参考图片 (用于生成视频)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-shiyuan-red file:text-white hover:file:bg-red-700"
                    />
                 </div>
                 <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-xs text-shiyuan-gold block mb-1">视频比例</label>
                        <select 
                            value={videoAspectRatio} 
                            onChange={(e) => setVideoAspectRatio(e.target.value as any)}
                            className="w-full bg-black/20 border border-white/20 rounded p-2 text-sm"
                        >
                            <option value="16:9">横屏 (16:9)</option>
                            <option value="9:16">竖屏 (9:16)</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="text-xs text-shiyuan-gold block mb-1">图片尺寸 (Imagen)</label>
                         <select 
                            value={imageSize} 
                            onChange={(e) => setImageSize(e.target.value as any)}
                            className="w-full bg-black/20 border border-white/20 rounded p-2 text-sm"
                        >
                            <option value="1K">1K</option>
                            <option value="2K">2K</option>
                            <option value="4K">4K</option>
                        </select>
                    </div>
                 </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-white/10">
                {activeTab === 'visualize' ? (
                    <>
                         <button
                            onClick={executeAI}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-shiyuan-red to-red-800 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Video size={18}/>}
                            生成视频 (Veo)
                        </button>
                        <button
                            onClick={executeImageGen}
                            disabled={loading}
                            className="flex-1 bg-white/10 text-white py-3 rounded-lg font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={18}/>}
                            生成图片 (Imagen)
                        </button>
                    </>
                ) : (
                    <>
                         <button
                            onClick={executeAI}
                            disabled={loading}
                            className="flex-1 bg-shiyuan-gold text-shiyuan-dark py-3 rounded-lg font-bold hover:brightness-110 transition-all flex justify-center items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : activeTab === 'plan' ? <BrainCircuit size={18}/> : <Search size={18}/>}
                            {activeTab === 'plan' ? '深度思考生成 (Gemini Pro)' : '智能搜索 (Grounding)'}
                        </button>
                        {activeTab === 'plan' && (
                             <button
                                onClick={executeFast}
                                disabled={loading}
                                className="flex-1 bg-white/10 text-white py-3 rounded-lg font-bold hover:bg-white/20 transition-all flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Zap size={18}/>}
                                快速生成 (Flash Lite)
                            </button>
                        )}
                    </>
                )}
            </div>
          </div>

          {/* Output Area */}
          {(result || loading) && (
            <div className="mt-8 bg-black/40 rounded-xl p-6 min-h-[200px] border border-white/5 animate-fade-in">
              <h3 className="text-shiyuan-gold font-serif text-lg mb-4 border-b border-white/10 pb-2">
                生成结果
              </h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                    <Loader2 className="w-8 h-8 text-shiyuan-gold animate-spin" />
                    <p className="text-sm opacity-60 animate-pulse">
                        {activeTab === 'visualize' ? '正在渲染高分辨率视频 (Veo 3.1)... 可能需要几分钟' : 'AI正在深度思考中...'}
                    </p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  {activeTab === 'visualize' ? (
                      result && result.startsWith('data:image') ? (
                          <img src={result} alt="Generated" className="w-full rounded-lg shadow-lg" />
                      ) : (
                          <video src={result || ''} controls className="w-full rounded-lg shadow-lg" autoPlay loop />
                      )
                  ) : (
                    <div className="whitespace-pre-wrap font-light leading-relaxed">
                        {result}
                        {groundingLinks.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <h4 className="text-sm font-bold mb-2 text-shiyuan-gold">来源引用:</h4>
                                <ul className="list-disc pl-5 text-sm opacity-70">
                                    {groundingLinks.map((chunk, idx) => (
                                        <li key={idx}>
                                            <a href={chunk.web?.uri} target="_blank" rel="noreferrer" className="hover:text-shiyuan-gold underline">
                                                {chunk.web?.title || chunk.web?.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shiyuan-red rounded-full blur-[100px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
};

export default AIPlayground;