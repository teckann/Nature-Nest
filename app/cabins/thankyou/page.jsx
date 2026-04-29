import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4 px-4">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-lg sm:text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
