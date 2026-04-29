import { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

// export const revalidate = 0;

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return { title: `Cabin ${cabin.name}` };
}

/*
  this page actually is dynamic 
    1. access localhost:300/cabins/1
    2. fetch the data
    3. render
  ! sometime, it will slow, we need to improve the system performance

  * new technique: Static Site Generation (SSG) - generateStaticParams
  - Next.js will pre-generate a static site in CDN (cabins/1, cabins/2, etc.)
  - rendering speed will be faster, and Search Engine Optimization (SEO) will be better.

  -> generateStaticParams: is used to tell Next.js which dynamic route parameters should be pre-rendered at build time

  Tips: run "npm run build" to analysis the website (see what different btw generateStaticParams & without it)
*/
export async function generateStaticParams() {
  // all the cabins data
  const cabins = await getCabins();

  // the value store in cabinId must be String
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  // console.log(ids);

  return ids;
}

export default async function Page({ params }) {
  // console.log(params);

  // this on will get "undefined", because params is a promise
  // const cabin = await getCabin(params.cabinId);

  // params is a promise, we should do like this
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-3xl sm:text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
