import React from 'react'
import Full_Header from '@/components/Full_Header'
import Movie_Page from '@/components/Movie_Page'
import QualityButton from '@/components/QualityButton'

const page = () => {
  return (
    <div>
      <Full_Header />
      <Movie_Page />
      <QualityButton />
    </div>
  )
}

export default page