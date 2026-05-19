"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const context = useLanguage();

  // Protección contra el error "Cannot read properties of undefined (reading 'home')"
  if (!context) {
    return (
      <header className="pokedex-red border-b-8 border-red-900 shadow-2xl sticky top-0 z-50 h-20 w-full" />
    );
  }

  const { t, setLang, lang } = context;

  return (
    <header className="pokedex-red border-b-8 border-red-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Leds Superiores y Logo */}
        <div className="flex items-start gap-4">
          <Link href="/" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white led-blue flex-shrink-0 shadow-lg hover:brightness-110 transition-all" />
          <div className="flex gap-2 mt-1">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-red-900 led-red" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-red-900 led-yellow" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-red-900 led-green" />
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="hidden md:flex gap-8 font-bold text-white uppercase text-xs tracking-widest items-center">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            {t.home}
          </Link>

          {/* APARTADO GENERACIONES (DESPLEGABLE) */}
<div className="relative group py-4">
  <button className="flex items-center gap-1 hover:text-yellow-400 transition-colors uppercase font-bold text-xs tracking-widest">
    {t.generations}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  
  <div className="absolute hidden group-hover:block top-full left-0 w-48 bg-white shadow-2xl rounded-xl border-4 border-red-900 p-2 animate-in fade-in slide-in-from-top-2">
    {/* Generaciones 1 y 2 directas */}
    {[1, 2].map((num) => (
      <Link 
        key={num} 
        href={`/generation/${num}`} 
        className="block px-4 py-2 hover:bg-red-50 text-slate-800 rounded-lg transition-colors border-b border-slate-100"
      >
        {t[`gen${num}`]}
      </Link>
    ))}

    {/* SUBMENÚ: OTROS (Contiene 3 y 4) */}
    <div className="relative group/sub">
      <div className="flex items-center justify-between px-4 py-2 hover:bg-red-50 text-slate-800 rounded-lg cursor-pointer transition-colors">
        <span className="font-bold">{t.other || "Otros"}</span>
        <span>➨</span>
      </div>
      
      {/* El Submenú que sale a la derecha */}
      <div className="absolute hidden group-hover/sub:block top-0 left-full ml-2 w-48 bg-white shadow-2xl rounded-xl border-4 border-red-900 p-2">
        {[3, 4].map((num) => (
          <Link 
            key={num} 
            href={`/generation/${num}`} 
            className="block px-4 py-2 hover:bg-red-50 text-slate-800 rounded-lg transition-colors border-b border-slate-100 last:border-0"
          >
            {t[`gen${num}`]}
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>

          <Link href="/contacto" className="hover:text-yellow-400 transition-colors">
            {t.contact}
          </Link>
        </nav>

        {/* Selectores de Idioma (ES, EN, JP) */}
        <div className="flex gap-1 md:gap-2">
          {['es', 'en', 'jp'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded border-2 border-red-900 font-black text-[10px] transition-all ${
                lang === l 
                  ? 'bg-yellow-400 text-black scale-110 shadow-md border-yellow-600' 
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}