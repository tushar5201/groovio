import { CreditsInterface, MovieDetailsInterface } from '@/interfaces/MovieDetails'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

export default function LeftSection({ movieData, creditsData }: { movieData: MovieDetailsInterface, creditsData: CreditsInterface }) {
  return (
    <div className='max-h-screen'>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${movieData.poster_path}`}
        alt={movieData.original_title}
        width={300}
        height={300}
        className="rounded-3xl"
      />

      <Card className='mt-5 bg-[#0b1120cc] border-0'>
        <CardHeader className='text-white'>Top Cast</CardHeader>
        <CardContent>
          {
            creditsData.cast.map((actor, i) => (
              i < 3 && actor.profile_path !== null && (
                <div key={actor.id} className='flex items-center border-b-2 border-black-grey'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${actor.profile_path}`}
                    alt={actor.original_name}
                    width={50}
                    height={50}
                    className="w-3/12 py-2 h-21 rounded-[50%] inline-block me-2"
                  />
                  <div className='w-1/12'></div>
                  <div className='w-8/12'>
                    <h3 className='text-white'>{actor.name}</h3>
                    <h6 className='text-soft-grey'>{actor.character}</h6>`
                  </div>
                </div>
              )
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
