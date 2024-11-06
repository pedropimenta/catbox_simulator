'use client';

import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-400">
      <p className="flex items-center justify-center gap-2">
        Developed By: 
        <a 
          href="https://t.me/pedrodeveloper" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
        >
          Pedro Developer
          <ExternalLink className="w-4 h-4" />
        </a>
      </p>
    </footer>
  );
}