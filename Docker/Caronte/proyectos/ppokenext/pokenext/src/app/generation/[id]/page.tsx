"use client";
import { useEffect, useState, use } from 'react';
import PokemonCard from '@/components/PokemonCard';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const genRanges: any = {
  '1': { min: 1, max: 151 },
  '2': { min: 152, max: 251 },
  '3': { min: 252, max: 386 },
  '4': { min: 387, max: 493 },
};

export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalPokemon, setModalPokemon] = useState<any>(null);

  const range = genRanges[id];
  const isInvalidGen = !range;

  useEffect(() => {
    const fetchGen = async () => {
      if (isInvalidGen) { setLoading(false); return; }
      setLoading(true);
      const idsSet = new Set<number>();
      while (idsSet.size < 10) {
        idsSet.add(Math.floor(Math.random() * (range.max - range.min + 1)) + range.min);
      }
      try {
        const results = await Promise.all(Array.from(idsSet).map(id => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        ));
        setPokemons(results);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchGen();
  }, [id, isInvalidGen]);

  useEffect(() => {
    if (selectedId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedId}`)
        .then(res => res.json())
        .then(data => setModalPokemon(data));
    } else {
      setModalPokemon(null);
    }
  }, [selectedId]);

  if (isInvalidGen) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="pokedex-red p-8 rounded-[2.5rem] border-8 border-red-900 shadow-2xl max-w-md w-full">
        <div className="bg-slate-900 p-6 rounded-2xl border-4 border-slate-700">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-blue-400 font-mono text-sm uppercase">&gt; {t.gen_error || "GENERACIÓN NO ENCONTRADA"}_</p>
        </div>
        <Link href="/" className="mt-6 inline-block bg-yellow-400 text-black font-black px-8 py-3 rounded-xl border-b-4 border-yellow-600 uppercase text-xs">
          {t.home}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-600 uppercase tracking-wider">
        {t[`gen${id}`]}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {pokemons.map((p, index) => (
          <div key={`${p.id}-${index}`} onClick={() => setSelectedId(p.id)} className="cursor-pointer transform hover:scale-105 transition-transform">
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>

      {selectedId && modalPokemon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl">&times;</button>
            
            <div className="text-center">
              <img src={modalPokemon.sprites.other['official-artwork'].front_default} className="w-48 h-48 mx-auto drop-shadow-lg" alt={modalPokemon.name} />
              <p className="text-gray-400 font-mono mt-2">Nº {modalPokemon.id}</p>
              <h2 className="text-3xl font-bold capitalize text-gray-800">{modalPokemon.name}</h2>
            </div>

            {/* SECCIÓN DE ESTADÍSTICAS RESTAURADA */}
            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.hp}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  {modalPokemon.stats[0].base_stat}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.attack}</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                  {modalPokemon.stats[1].base_stat}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.defense}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  {modalPokemon.stats[2].base_stat}
                </span>
              </div>
            </div>

            {/* BOTONES DE NAVEGACIÓN */}
            <div className="flex justify-between mt-8 gap-4">
              <button 
                disabled={selectedId <= 1}
                onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId - 1); }}
                className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-30"
              >
                ◀ {t.previous || "Prev"}
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(selectedId + 1); }}
                className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold active:scale-95 transition-all"
              >
                {t.next || "Next"} ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}