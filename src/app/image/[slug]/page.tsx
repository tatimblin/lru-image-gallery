async function getData(): Promise<number> {
  return 1
}

export default async function Single() {
  const data = await getData();

  return (
      <div>
          <h1>Single: {data}</h1>
      </div>
  );
}