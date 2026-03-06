import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  // ANA TABELA
  title: "AI Hediye Bulucu | Yapay Zeka ile En İyi Hediye Önerileri",
  
  // AÇIKLAMA
  description: "Hediye seçme stresine son! Yapay zeka asistanımızla sevdikleriniz için Amazon ve Trendyol'daki en iyi hediyeleri saniyeler içinde bulun.",
  
  // ANAHTAR KELİMELER (Sadece Hediye Odaklı)
  keywords: ["hediye bulucu", "ai hediye", "ne hediye alınır", "hediye önerileri", "yapay zeka asistanı", "kişiye özel hediye"],
  
  // GOOGLE SEARCH CONSOLE
  verification: {
    google: "2zsuq1XPA8IAxmy49iJbyP7rYP_qz_hSCgswY9ZaVio", 
  },

  openGraph: {
    title: "AI Hediye Bulucu",
    description: "Sizin için en doğru hediyeyi bulan yapay zeka.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}