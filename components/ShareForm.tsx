"use client";
import React, { useState, useEffect } from 'react';
import { Share } from '@/interfaces/Share';

interface Props {
  onAdd: (data: any) => void;
  editingShare: Share | null;
  onUpdate: (data: Share) => void;
}

export const ShareForm = ({ onAdd, editingShare, onUpdate }: Props) => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [change, setChange] = useState('');


  useEffect(() => {
    if (editingShare) {
      setSymbol(editingShare.symbol);
      setPrice(editingShare.price.toString());
      setChange(editingShare.change.toString());
    } else {
      setSymbol('');
      setPrice('');
      setChange('');
    }
  }, [editingShare]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !price) {
      alert("Lütfen sembol ve fiyat alanlarını doldurun.");
      return;
    }

    if (editingShare) {
      onUpdate({
        ...editingShare,
        symbol: symbol.toUpperCase(),
        price: parseFloat(price),
        change: parseFloat(change) || 0
      });
    } else {
      onAdd({ 
        symbol: symbol.toUpperCase(), 
        price: parseFloat(price), 
        change: parseFloat(change) || 0 
      });
    }

    // cleaning
    setSymbol(''); setPrice(''); setChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-xl border-2 border-blue-500/30 grid grid-cols-1 md:grid-cols-4 gap-4 items-end shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Hisse Sembolü</label>
        <input 
          value={symbol} 
          onChange={e => setSymbol(e.target.value)} 
          className="bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 text-white" 
          placeholder="Örn: BTC" 
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Fiyat (₺)</label>
        <input 
          type="number" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          className="bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 text-white" 
          placeholder="0.00" 
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Değişim %</label>
        <input 
          type="number" 
          step="0.01" 
          value={change} 
          onChange={e => setChange(e.target.value)} 
          className="bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 text-white" 
          placeholder="0.00" 
        />
      </div>
      <button 
        type="submit" 
        className={`p-2 rounded font-bold transition-all active:scale-95 ${editingShare ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
      >
        {editingShare ? 'Değişiklikleri Kaydet' : 'Listeye Ekle'}
      </button>
    </form>
  );
};