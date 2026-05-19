export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">¡Vaya! Esta generacion no se ha encontrado (Página no encontrada).</p>
      <a href="/" className="mt-4 text-blue-500 underline">Volver al inicio</a>
    </div>
  );
}