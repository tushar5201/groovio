// type PageProps = {
//   params: {
//     movieId: string;
//   };
// };

export default async function Page({ params }: {params: Promise<{ movieId: string }>}) {
  const { movieId } = await params;

  return (
    <div>
      <h1 className="text-white">{movieId}</h1>
    </div>
  );
}
