"use client";
import React, { Suspense } from 'react';
import House from "@/components/House/House";
import SearchBar from "@/components/SearchBar";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-textPrimary">
      <header className="Nav flex justify-between items-center w-full h-16 border-b border-highlight bg-black px-4">
        <a href="/" className="md:text-3xl text-base font-bold hidden md:inline">
          <h1 className=''>Dharavahik</h1>
        </a>
        <a href="/" className="">
          <img src="/logo.png" alt="Logo" className='w-14 md:ml-[5vw]' />
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
