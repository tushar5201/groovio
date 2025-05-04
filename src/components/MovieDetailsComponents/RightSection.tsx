import { MovieDetailsInterface } from '@/interfaces/MovieDetails';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import axios from 'axios';
import Image from 'next/image';

export default async function RightSection({ movieData }: { movieData: MovieDetailsInterface }) {
    const photosApi = await axios.get(`${process.env.BASE_URL}/get-movie-images/${movieData.id}`);
    const photos = photosApi.data.backdrops;

    const videosApi = await axios.get(`${process.env.BASE_URL}/get-movie-videos/${movieData.id}`);
    const videos = videosApi.data.results;
    return (
        <div className="ms-5 w-4/12">
            <Tabs defaultValue="Photos" orientation="vertical" >
                <TabsList className='w-full'>
                    <TabsTrigger value="Photos">Photos</TabsTrigger>
                    <TabsTrigger value="Videos">Videos</TabsTrigger>
                </TabsList>
                <TabsContent value="Photos">
                    <div className="">
                        {photos.length === 0 ? <h1 className='text-soft-grey text-center'>No photos available</h1> : (
                            photos.map((photo: { file_path: string }, i: number) => (
                                i < 3 &&
                                <Image
                                    width={500}
                                    height={500}
                                    key={i}
                                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${photo.file_path}`}
                                    alt=""
                                    className="w-full my-2 rounded-xl"
                                />
                            )))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="Videos">
                    {videos.length === 0 ? <h1 className='text-soft-grey text-center'>No videos available</h1> : (
                        videos.map((video: { key: string }, i: number) => (
                            i < 3 && <iframe key={i} width="100%" height="200" src={`https://www.youtube.com/embed/${video.key}`} className='rounded-xl' title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                        ))
                    )}
                </TabsContent>
            </Tabs>

        </div>
    )
}

