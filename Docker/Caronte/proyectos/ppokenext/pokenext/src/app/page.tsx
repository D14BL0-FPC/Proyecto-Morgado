"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PokemonCard from '@/components/PokemonCard';

export default function HomePage() {
  const context = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  if (!context) return null; // Protección de contexto
  const { t } = context;

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <main className="min-h-[80vh] flex flex-col items-center p-10">
      <div className="bg-slate-800 p-6 rounded-lg border-l-8 border-blue-500 shadow-2xl mb-10 max-w-2xl w-full">
        <h1 className="text-2xl font-mono font-bold text-blue-400">&gt; {t.welcome}_</h1>
      </div>
      <div className="w-full max-w-xs transform hover:rotate-1 transition-transform">
        {/* Sin botón de detalles en el inicio */}
        {pokemon && <PokemonCard pokemon={pokemon} showButton={false} />}
      </div>
    </main>
  );
}