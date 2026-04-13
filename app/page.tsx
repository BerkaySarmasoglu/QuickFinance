"use client";
import React, { useState } from 'react';
import Image from "next/image";
import {ShareForm} from "@/components/ShareForm";
import {Share} from "@/interfaces/Share";

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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShare, setEditingShare] = useState<Share | null>(null);

  // filtering
  const savedShares = allShares.filter(s => s.isSaved);
  const topGainers = [...allShares].sort((a, b) => b.change - a.change).slice(0, 4);

  // CRUD: CREATE 
  const handleAdd = (formData: any) => {
    const newEntry: Share = {
      id: Date.now().toString(),
      symbol: formData.symbol,
      name: `${formData.symbol} A.Ş.`, // default name
      price: formData.price,
      change: formData.change,
      isSaved: false
    };
    setAllShares([newEntry, ...allShares]);
    setIsFormOpen(false);
  };

  // CRUD: UPDATE
  const handleUpdate = (updatedShare: Share) => {
    setAllShares(allShares.map(s => s.id === updatedShare.id ? updatedShare : s));
    setEditingShare(null);
    setIsFormOpen(false);
  };

  const toggleSave = (id: string) => {
    setAllShares(allShares.map(share => 
      share.id === id ? { ...share, isSaved: !share.isSaved } : share
    ));
  };

  // CRUD: DELETE 
  const removeShare = (id: string) => {
    if(confirm("Bu hisseyi silmek istediğinize emin misiniz?")) {
      setAllShares(allShares.filter(share => share.id !== id));
    }
  };

  const startEditing = (share: Share) => {
    setEditingShare(share);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="mb-10 flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-blue-400 tracking-tight">Quick Finance</h1>
          <p className="text-slate-400 text-sm italic">Hisse Senedi Takip Paneli</p>
        </div>
        <button 
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            if(isFormOpen) setEditingShare(null);
          }}
          className={`${isFormOpen ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'} px-6 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95`}
        >
          {isFormOpen ? 'Vazgeç' : '+ Yeni Hisse Ekle'}
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* FORM ALANI */}
          {isFormOpen && (
            <section className="mb-10">
              <h2 className="text-blue-400 font-bold mb-3 uppercase text-xs tracking-widest">
                {editingShare ? 'Hisse Bilgilerini Düzenle' : 'Yeni Kayıt Oluştur'}
              </h2>
              <ShareForm 
                onAdd={handleAdd} 
                editingShare={editingShare} 
                onUpdate={handleUpdate} 
              />
            </section>
          )}

          {/* TOP GAINERS */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-300">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span> En Çok Kazandıranlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topGainers.map(share => (
                <div key={share.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">{share.symbol}</span>
                    <span className="text-green-400 font-mono font-bold">%{share.change}</span>
                  </div>
                  <p className="text-2xl mt-2 font-light">₺{share.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TÜM HİSSELER TABLOSU */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-300 flex items-center gap-2">
               <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Tüm Varlıklar
            </h2>
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-700/50 text-slate-400 uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="p-4">Hisse</th>
                      <th className="p-4">Fiyat</th>
                      <th className="p-4">Değişim</th>
                      <th className="p-4 text-right">İşlemler (CRUD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {allShares.map(share => (
                      <tr key={share.id} className="hover:bg-slate-700/30 transition-colors group">
                        <td className="p-4">
                          <div className="font-bold text-slate-100">{share.symbol}</div>
                          <div className="text-[10px] text-slate-500">{share.name}</div>
                        </td>
                        <td className="p-4 font-mono font-medium text-slate-300">₺{share.price.toLocaleString()}</td>
                        <td className={`p-4 font-bold ${share.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {share.change > 0 && '+'}{share.change}%
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <button 
                            onClick={() => startEditing(share)} 
                            className="p-2 text-orange-400 hover:bg-orange-400/10 rounded-lg transition-colors text-xs font-bold"
                          >
                            DÜZENLE
                          </button>
                          <button 
                            onClick={() => removeShare(share.id)} 
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-xs font-bold"
                          >
                            SİL
                          </button>
                          <button 
                            onClick={() => toggleSave(share.id)} 
                            className={`p-2 rounded-lg transition-colors text-lg ${share.isSaved ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-400'}`}
                          >
                            {share.isSaved ? '★' : '☆'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* SAĞ KOLON: SAVED SHARES */}
        <aside className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-3xl border border-blue-500/30 shadow-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center justify-between">
              Takip Listesi
              <span className="bg-blue-900/50 text-blue-400 text-xs px-2 py-1 rounded-full">{savedShares.length}</span>
            </h2>
            {savedShares.length > 0 ? (
              <div className="space-y-4">
                {savedShares.map(share => (
                  <div key={share.id} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-all">
                    <div>
                      <p className="font-bold text-sm text-slate-100">{share.symbol}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">₺{share.price}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold ${share.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        %{share.change}
                      </p>
                      <button onClick={() => toggleSave(share.id)} className="text-[10px] text-red-400/70 hover:text-red-400 font-bold uppercase transition-colors">Kaldır</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                <p className="text-slate-600 text-sm italic italic">Yıldız ikonuna basarak<br/>takibe alabilirsiniz.</p>
              </div>
            )}
          </div>
        </aside>

      </div>
      <footer className="max-w-7xl mx-auto mt-20 pb-10 border-t border-slate-800 pt-8 text-center text-slate-500 text-xs">
        &copy; 2026 Quick Finance Dashboard - Modern Web JS Projesi
      </footer>
    </div>
  );
}