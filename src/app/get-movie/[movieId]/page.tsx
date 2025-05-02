export default async function Page({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params; // No need to await here as params is already resolved.

  return (
    <div>
      <h1 className="text-white">{movieId}</h1>
    </div>
  );
}