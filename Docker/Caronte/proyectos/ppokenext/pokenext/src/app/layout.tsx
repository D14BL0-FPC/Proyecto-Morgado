import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <footer className="p-4 text-center bg-gray-100 mt-10">
            {/* El footer se adaptará luego con el idioma */}
            PokeApp 2026 - IES Cura Valera
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}