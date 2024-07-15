import React from 'react'
import Full_Header from '@/components/Full_Header'
import Movie_Page from '@/components/Movie_pg/Movie_Page'

const page = () => {
  return (
    <div>
      <Full_Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Movie_Page />
      </Suspense>
    </div>
  )
}

export default page