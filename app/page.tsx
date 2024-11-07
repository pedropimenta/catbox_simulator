import BoxSimulator from '@/components/BoxSimulator';
import { ExternalLink, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-base md:text-4xl font-bold text-white mb-4">😼 CatBox: Box Opening Simulator 💎</h1>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://t.me/CatBoxGame_bot/app?startapp=3JO02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Open Real Boxes on Telegram
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/roi-calculator"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              ROI Calculator
              <Calculator className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <BoxSimulator />
      </div>
    </main>
  );
}