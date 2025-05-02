
export default async function page({ params }: { params: { movieId: string } }) {
  const movieId = params.movieId;
  
  return (
    <div>
      <h1 className="text-white">{movieId}</h1>
    </div>
  )
}
