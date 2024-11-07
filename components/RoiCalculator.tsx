'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RoiCalculator() {
  const [tokensPerDay, setTokensPerDay] = useState('');
  const [investment, setInvestment] = useState('');
  const [tokenValue, setTokenValue] = useState('');
  const [roiDays, setRoiDays] = useState<number | null>(null);

  const calculateRoi = () => {
    const dailyReturn = Number(tokensPerDay) * Number(tokenValue);
    const totalInvestment = Number(investment);
    
    if (dailyReturn <= 0 || totalInvestment <= 0) return;
    
    const daysToRoi = totalInvestment / dailyReturn;
    setRoiDays(Math.ceil(daysToRoi));
  };

  return (
    <Card className="p-6 bg-gray-900 border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">ROI Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="tokensPerDay" className="text-gray-200 mb-2 block">Tokens per Day</Label>
          <Input
            id="tokensPerDay"
            type="number"
            value={tokensPerDay}
            onChange={(e) => setTokensPerDay(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter tokens per day"
          />
        </div>

        <div>
          <Label htmlFor="investment" className="text-gray-200 mb-2 block">Total of Investment in (USD)</Label>
          <Input
            id="investment"
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter investment amount"
          />
        </div>

        <div>
          <Label htmlFor="tokenValue" className="text-gray-200 mb-2 block">Token Value (USD)</Label>
          <Input
            id="tokenValue"
            type="number"
            value={tokenValue}
            onChange={(e) => setTokenValue(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter token value"
          />
        </div>

        <Button 
          onClick={calculateRoi}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate ROI
        </Button>

        {roiDays !== null && (
          <div className="mt-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-inner">
            <h3 className="text-lg font-semibold text-white mb-2">Results:</h3>
            <p className="text-gray-200 text-lg">
              ROI in days: <span className="font-bold text-emerald-400 text-xl">{roiDays}</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
} 