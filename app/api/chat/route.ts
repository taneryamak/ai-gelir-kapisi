import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Anahtarı eksik!" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Panelde ne görüyorsan o! 2026'nın en hızlısı:
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `Sen uzman bir hediye danışmanısın. Kullanıcının isteğine göre Türkiye pazaryerlerine uygun 3 yaratıcı hediye önerisi ver.
       
       ÖNEMLİ KURALLAR:
       1. Her öneri için bir başlık, kısa bir açıklama ve nedenini yaz.
       2. Her önerinin sonuna mutlaka şu formatta bir Trendyol arama linki ekle: 
          [Ürünü Trendyol'da Gör](https://www.trendyol.com/sr?q=URUN_ADI)
       3. URUN_ADI kısmını önerdiğin ürünün adıyla (boşluklar yerine + koyarak) değiştir.
       
       İstek: ${prompt}`
    );

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("DETAYLI LOG:", error);
    // Hatanın tam sebeini ekrana yazdıralım ki ne olduğunu görelim
    return NextResponse.json({ error: "Hata: " + error.message }, { status: 500 });
  }
}