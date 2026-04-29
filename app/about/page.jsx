import Image from "next/image";
import image1 from "@/public/about-3.png";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

// this info is not very important
// so just set every day re-generate enought (but set 0 if we want to test)
// if dont know this - goto cabins/page.jsx (the way to skip Next.js catch mechanism)
export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();
  const total = cabins.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-12 md:gap-x-24 gap-y-12 md:gap-y-32 text-lg items-center">
      <div className="md:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-10 text-accent-400 font-medium">
          Welcome to NatureNest
        </h1>

        <div className="space-y-8">
          <p>
            Where immersive stays and seamless reservations come together in
            perfect harmony. Nestled in the scenic highlands of Cameron
            Highlands, Malaysia, this luxury cabin retreat offers a peaceful
            escape surrounded by breathtaking nature, cool mountain air, and
            unforgettable experiences.
          </p>
          <p>
            Our {total + " "} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="md:col-span-2">
        {/*
          Image in Next: should declare the width & height (compulsory)
          --> there have 2 technique to put the image inside Image without setting width & height

          Technique 1: import the image
          * this technique only suitable for the image that available in local (not inside in database)
        */}
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          className="w-full h-120"
        />
      </div>

      {/* 
        Technique 2: put Image inside a box and configure some styling in that box
        --> the box should put "relative" and "aspect-square"
        --> inside the Image should put "fill" and className="object-cover"

        * this technique is useful when the image is fetch from database and we dont want set the width & height
      */}
      <div className="relative aspect-square md:col-span-2 order-last md:order-none">
        <Image
          src="/about-5.png"
          fill
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="md:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1980
        </h1>

        <div className="space-y-8">
          <p>
            Since 1980, NatureNest has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of NatureNest,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at
            NatureNest soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
