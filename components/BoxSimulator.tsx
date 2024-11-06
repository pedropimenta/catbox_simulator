'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Sparkles, Diamond, Box, Trophy, Trash2, Gift } from 'lucide-react';

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legend';

interface BoxResult {
  rarity: Rarity;
  timestamp: number;
}

const BASE_RARITY_CONFIG = {
  Legend: { chance: 0.005, color: 'text-yellow-400', icon: Trophy },
  Epic: { chance: 0.03, color: 'text-pink-500', icon: Diamond },
  Rare: { chance: 0.15, color: 'text-purple-500', icon: Sparkles },
  Uncommon: { chance: 0.35, color: 'text-blue-400', icon: Star },
  Common: { chance: 0.465, color: 'text-gray-400', icon: Box },
};

const BOOSTED_RARITY_CONFIG = {
  Legend: { chance: 0.0075, color: 'text-yellow-400', icon: Trophy }, // 0.5% + 0.25% = 0.75%
  Epic: { chance: 0.04, color: 'text-pink-500', icon: Diamond },      // 3% + 1% = 4%
  Rare: { chance: 0.15, color: 'text-purple-500', icon: Sparkles },
  Uncommon: { chance: 0.35, color: 'text-blue-400', icon: Star },
  Common: { chance: 0.465, color: 'text-gray-400', icon: Box },      // Adjusted to make total 100%
};

const BOX_CONFIGS = [
  { quantity: 1, bonusItems: 0, useBoost: false },
  { quantity: 15, bonusItems: 1, useBoost: false },
  { quantity: 50, bonusItems: 5, useBoost: true },
  { quantity: 100, bonusItems: 10, useBoost: true },
  { quantity: 150, bonusItems: 15, useBoost: true },
  { quantity: 200, bonusItems: 20, useBoost: true },
  { quantity: 250, bonusItems: 25, useBoost: true },
];

export default function BoxSimulator() {
  const [results, setResults] = useState<BoxResult[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const getRarity = (useBoost: boolean): Rarity => {
    const config = useBoost ? BOOSTED_RARITY_CONFIG : BASE_RARITY_CONFIG;
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [rarity, rarityConfig] of Object.entries(config)) {
      cumulative += rarityConfig.chance;
      if (rand <= cumulative) {
        return rarity as Rarity;
      }
    }
    return 'Common';
  };

  const simulateOpenings = (quantity: number) => {
    setIsSimulating(true);
    const boxConfig = BOX_CONFIGS.find(config => config.quantity === quantity);
    if (!boxConfig) return;

    const newResults: BoxResult[] = [];
    const totalItems = quantity + boxConfig.bonusItems;

    for (let i = 0; i < totalItems; i++) {
      newResults.push({
        rarity: getRarity(boxConfig.useBoost),
        timestamp: Date.now() + i,
      });
    }

    setResults(newResults);
    setIsSimulating(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  const getStats = () => {
    const stats = {
      Legend: 0,
      Epic: 0,
      Rare: 0,
      Uncommon: 0,
      Common: 0,
    };

    results.forEach((result) => {
      stats[result.rarity]++;
    });

    return stats;
  };

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-gray-400">Choose the number of boxes to open and see your results!</p>
      </div>

      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {BOX_CONFIGS.map(({ quantity, bonusItems }) => (
            <Button
              key={quantity}
              onClick={() => simulateOpenings(quantity)}
              disabled={isSimulating}
              className=" h-15 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <div className="text-center">
                <div className="font-bold">Open {quantity}</div>
                {bonusItems > 0 && (
                  <div className="text-xs flex items-center justify-center gap-1 mt-1">
                    <Gift className="w-3 h-3" />
                    +{bonusItems} bonus
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {results.length > 0 && (
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Results</h2>
              <p className="text-gray-400 text-sm">Total items: {results.length}</p>
            </div>
            <Button
              onClick={clearResults}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Results
            </Button>
          </div>
          <div className="space-y-4">
            {Object.entries(BASE_RARITY_CONFIG).map(([rarity, config]) => {
              const count = stats[rarity as Rarity];
              const percentage = (count / results.length) * 100;
              const Icon = config.icon;
              
              return (
                <div key={rarity} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <span className={`font-semibold ${config.color}`}>
                      {rarity}
                    </span>
                    <span className="text-gray-400">
                      ({count} - {percentage.toFixed(2)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}