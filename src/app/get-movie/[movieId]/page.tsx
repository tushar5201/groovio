
interface PageProps {
  params: {
    movieId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { movieId } = await params;

  return (
    <div>
      <h1 className="text-white">{movieId}</h1>
    </div>
  );
}
