"use client";
import React, { Suspense } from 'react';
import House from "@/components/House/House";
import SearchBar from "@/components/SearchBar";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <header className="Nav flex justify-between items-center w-full h-16 border-b border-highlight bg-background px-4">
        <a href="/" className="text-3xl font-bold">
          <img src="/logo.png" alt="Logo" className='w-14 ml-6' />
        </a>
        <SearchBar />
      </header>

      <main className="py-4">
        <Suspense fallback={<div>Loading...</div>}>
          <House />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
