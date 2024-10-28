'use client';

import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  const title = 'Kabousse Electronics';

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <div className="flex justify-center text-center px-4 sm:px-8">
        <div className="my-4 max-w-lg md:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-400 mb-4 blinking-title">
            {title}
          </h1>
          <div className="my-8">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 leading-snug">
              A melhor loja de eletrônicos com os melhores preços e qualidade!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-6">
              Encontre o que há de mais recente em tecnologia.
            </p>
            <Link href="/products">
              <span className="inline-block px-10 py-3 sm:px-12 sm:py-4 md:px-16 md:py-4 bg-green-400 text-white font-bold text-lg sm:text-xl md:text-2xl rounded-lg hover:bg-green-500 transition">
                Produtos
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
