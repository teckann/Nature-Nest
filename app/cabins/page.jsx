// @/app/ is Aliases, Next.js include it as default
import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

/* 
  control how often a page should be revalidated (re-generated)
  [Route Level]

  revalidate = 0
  -> Disable caching
  -> Page is rendered on every request 
  -> similar to Server-Side Rendering (SSR)

  revalidate = 15
  -> Enable caching
  -> Page is statically generated and revalidated every 15 seconds
  -> Incremental Static Regeneration (ISR)

  revalidate = false (default)
  -> Page is fully static
  -> Generated at build time and never revalidated 
  -> Static Site Generation (SSG)

  ⚠️ Note:
  Revalidation behavior only works in production mode (the situation after we deploy)
  Use "npm run build && npm run start" // "npm run prod" to test it
  When the code is changed, then we need stop it and run again

  * after finish develop a page, dont forget test the code in production mode (actual thing we see after deploy)
  * develop: npm run dev
  * after develop: npm run build && npm run start
*/
// now we no need this, because we alr implement it in [Component Level] - refer CabinList.jsx
// export const revalidate = 0;

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const searchItem = await searchParams;
  const filter = searchItem?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-10">
        Cozy yet luxurious cabins nestled in the scenic highlands of Cameron
        Highlands, Malaysia. Wake up to breathtaking hilltop views, explore lush
        greenery and misty forests, or unwind in peaceful comfort surrounded by
        cool mountain air. Experience nature’s beauty in your own private
        retreat—the perfect destination for a relaxing and memorable getaway.
      </p>

      <div className="flex justify-start sm:justify-end mb-8 overflow-x-auto pb-2">
        <Filter />
      </div>

      {/* Suspense will handle async Server Components (like CabinList) */}
      {/* When CabinList is still fetching data, it will "suspend" rendering */}
      {/* During that time, the fallback (Spinner) will be displayed */}
      {/* Once the data is ready, CabinList will be rendered */}

      {/* This allows the content above (title & description) to render immediately */}
      {/* instead of waiting for CabinList to finish loading */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
