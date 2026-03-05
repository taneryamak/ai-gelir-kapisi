import { Montserrat } from "next/font/google"; // Google fontunu çağırıyoruz
import "./globals.css";

// Font ayarlarını yapıyoruz
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"], // Normal, Bold ve Extra Bold
  variable: "--font-montserrat", // Tailwind v4 için değişken ismi
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/* Font sınıfını body'ye ekleyerek tüm siteye yayıyoruz */}
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}