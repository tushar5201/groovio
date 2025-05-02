export default function Page({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;

  return (
    <div>
      <h1 className="text-white">{movieId}</h1>
    </div>
  );
}