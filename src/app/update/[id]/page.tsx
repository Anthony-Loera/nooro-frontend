import Update from "./_components/Update";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Home({ params }: Readonly<Props>) {
  const { id } = await params;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-blue-500 text-5xl font-extrabold flex items-center justify-center">
        Todo App
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Update id={id} />
      </main>
    </div>
  );
}
