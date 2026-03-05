"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setResult(data.text || data.error);
    } catch (err) {
      setResult("Bir hata oluştu.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
        <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        Hediye Bulucu AI
        </h1>
          <p className="text-slate-600">Yapay zeka asistanın senin için en mantıklı hediyeleri bulur ve linklerini hazırlar.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 flex gap-3 border border-slate-200">
          <input
            type="text"
            className="flex-1 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            placeholder="Kime hediye arıyorsun? (Örn: Bisiklet seven bir arkadaşım)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Aranıyor..." : "Bul"}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-indigo-50 prose prose-indigo max-w-none">
            <ReactMarkdown
              components={{
                // Linkleri şık butonlara dönüştürüyoruz
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white no-underline font-bold py-2 px-6 rounded-lg shadow-md transition-all mt-2"
                  />
                ),
                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-slate-600 leading-relaxed" {...props} />
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}