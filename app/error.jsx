// error boundary should always be a client components
"use client";

/*
  keep in mind that error.jsx:
    - ONLY rendering error will be caught
    - NEVER catch the error that might happen in the root layout
  
    if we want catch the error happen in the root layout:
      -> create "global-error.jsx"
      -> one thing different: need to define its own HTML, like layout.jsx in root
*/
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
