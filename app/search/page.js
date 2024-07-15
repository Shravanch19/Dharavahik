import React, { Suspense } from 'react';
import Full_Header from "@/components/Full_Header"
import SearchPG from "@/components/Search_pg/SearchPG"

const page = () => {
  return (
    <div>
      <Full_Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPG />
      </Suspense>
    </div>
  )
}

export default page