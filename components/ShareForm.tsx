// src/components/ShareForm.tsx
import React, { useState } from 'react';

export const ShareForm = ({ onAdd }: { onAdd: (data: any) => void }) => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [change, setChange] = useState(''); // Yeni state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      symbol,
      price: parseFloat(price),
      change: parseFloat(change) // Sayıya çevirerek gönderiyoruz
    });
    setSymbol(''); setPrice(''); setChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end bg-slate-800 p-4 rounded-xl border border-slate-700">
      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs text-slate-400 mb-1">Sembol</label>
        <input 
          value={symbol} 
          onChange={e => setSymbol(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded outline-none focus:border-blue-500"
          placeholder="Örn: THYAO"
        />
      </div>
      <div className="flex-1 min-w-[100px]">
        <label className="block text-xs text-slate-400 mb-1">Fiyat (₺)</label>
        <input 
          type="number"
          value={price} 
          onChange={e => setPrice(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded outline-none focus:border-blue-500"
          placeholder="0.00"
        />
      </div>
      <div className="flex-1 min-w-[100px]">
        <label className="block text-xs text-slate-400 mb-1">Değişim (%)</label>
        <input 
          type="number"
          step="0.01" // Ondalıklı girişe izin ver
          value={change} 
          onChange={e => setChange(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 p-2 rounded outline-none focus:border-blue-500"
          placeholder="-2.5 veya 4.2"
        />
      </div>
      <button type="submit" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold transition">
        Ekle
      </button>
    </form>
  );
};