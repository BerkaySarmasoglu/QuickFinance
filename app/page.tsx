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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );

}