'use client';
export default function NarraticaHeader() {
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background px-8">
      <div className="container mx-auto flex items-center justify-between min-h-20 relative flex-row-reverse">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-xl font-extrabold tracking-wide">Narratica</p>
        </div>
      </div>
    </header>
  );
}
