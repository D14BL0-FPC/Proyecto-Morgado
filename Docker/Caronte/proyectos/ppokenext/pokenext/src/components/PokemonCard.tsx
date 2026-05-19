"use client";
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonCard({ pokemon, showButton = true }: { pokemon: any, showButton?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className="pokedex-red p-3 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-lg rounded-br-lg border-4 border-red-900 shadow-xl group">
      {/* "Pantalla" Interior */}
      <div className="bg-white rounded-lg p-4 border-4 border-slate-300 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] font-bold text-slate-400">ID: {pokemon.id}</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        <div className="bg-slate-100 rounded-md w-full py-4 flex justify-center border-2 border-slate-200 inner-shadow">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-32 h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
          />
        </div>

        <h3 className="text-lg font-black uppercase text-slate-800 mt-4 tracking-tighter">
          {pokemon.name}
        </h3>

        {showButton && (
          <button className="mt-4 w-full bg-slate-800 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            {t.details}
          </button>
        )}
      </div>
      
      {/* Detalles Estéticos del chasis */}
      <div className="flex justify-between mt-2 px-4">
        <div className="w-8 h-2 bg-red-900 rounded-full" />
        <div className="flex gap-1">
            <div className="w-3 h-3 bg-blue-900 rounded-full border border-red-900" />
            <div className="w-3 h-3 bg-green-900 rounded-full border border-red-900" />
        </div>
      </div>
    </div>
  );
}