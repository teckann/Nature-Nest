import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* 
        <Image />: a component provided by Next.js that can optimize the image 
          1. automatically serve correctly sized images in modern format (webp) - do it on demand
          2. prevent layout shifts (force us to specify the exact height and width)
          3. automatically lazy loads images only when they actually enter the viewport
      */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={75}
        alt="The Wild Oasis Logo"
      />

      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
