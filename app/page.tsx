"use client";
import React, { useState } from 'react';
import Image from "next/image";

interface Share {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  isSaved: boolean;
}

export default function QuickFinance() {

  const [allShares, setAllShares] = useState<Share[]>([
    {id: '1', symbol: 'THYAO', name: 'Türk Hava Yolları', price: 285.50, change: 2.4, isSaved: true },
    {id: '2', symbol: 'PGSUS', name: 'Pegasus Hava Yolları', price: 177.30, change: -0.95, isSaved: false},
    {id: '3', symbol: 'ASELS', name: 'Aselsan', price: 58.30, change: 4.8, isSaved: false },
    {id: '4', symbol: 'BTC', name: 'Bitcoin', price: 65000, change: 1.5, isSaved: false },
    {id: '5', symbol: 'SAHOL', name: 'Sabancı Holding', price: 94.90, change: -0.73, isSaved: false},
    {id: '6', symbol: 'TOASO', name: 'TOFAŞ', price: 310.50, change: 1.55, isSaved: true},
    {id: '7', symbol: 'SISE', name: 'Şişecam', price: 41.58, change: -1.00, isSaved: false},
    {id: '8', symbol: 'EMPAE', name: 'Empa Elektronik Sanayi Ve Ticaret AS', price: 37.76, change:9.96, isSaved: true},
    {id: '9', symbol: 'GENKM', name: 'Gentas Kimya Sanayi ve Ticaret Pazarlama AS', price: 15.94, change: -9.99, isSaved: true},
    {id: '10', symbol: 'BIMAS', name: 'BİM', price: 707.00, change: -0.21, isSaved: false}
  ]);

  const savedShares = allShares.filter(s => s.isSaved);
  const topGainers = [...allShares].sort((a, b) => b.change - a.change).slice(0, 4);


return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Quick Finance</h1>
          <p className="text-slate-400 text-sm">Canlı Piyasa Takibi</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition">
          + Yeni Hisse Ekle (Create)
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL KOLON: Top Gainers & All Shares */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Gainers Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span> En Çok Kazandıranlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topGainers.map(share => (
                <div key={share.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">{share.symbol}</span>
                    <span className="text-green-400 font-mono">%{share.change}</span>
                  </div>
                  <p className="text-2xl mt-2">₺{share.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* All Shares Section (Listeleme & Güncelleme) */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-300">Tüm Hisseler</h2>
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-700/50 text-slate-400">
                  <tr>
                    <th className="p-4">Sembol</th>
                    <th className="p-4">Fiyat</th>
                    <th className="p-4">Değişim</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {allShares.map(share => (
                    <tr key={share.id} className="hover:bg-slate-700/30 transition">
                      <td className="p-4 font-medium">{share.symbol}</td>
                      <td className="p-4">₺{share.price}</td>
                      <td className={`p-4 ${share.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        %{share.change}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => toggleSave(share.id)} className="text-blue-400 hover:underline">
                          {share.isSaved ? 'Takibi Bırak' : 'Kaydet'}
                        </button>
                        <button onClick={() => removeShare(share.id)} className="text-red-500 hover:text-red-300">Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* SAĞ KOLON: Saved Shares (Watchlist) */}
        <aside className="bg-slate-800 p-6 rounded-2xl border border-blue-500/30">
          <h2 className="text-xl font-bold mb-6 text-blue-400 underline decoration-2 underline-offset-8">
            Takip Listem (Saved)
          </h2>
          {savedShares.length > 0 ? (
            <div className="space-y-4">
              {savedShares.map(share => (
                <div key={share.id} className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <div>
                    <p className="font-bold">{share.symbol}</p>
                    <p className="text-xs text-slate-500">{share.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">₺{share.price}</p>
                    <button onClick={() => toggleSave(share.id)} className="text-[10px] text-red-400 uppercase tracking-wider">Kaldır</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-10 italic">Henüz kaydedilmiş hisse yok.</p>
          )}
        </aside>

      </div>
    </div>
  );

}