import { Josefin_Sans } from "next/font/google";

import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

const font = Josefin_Sans({
  subset: ["latin"],
  display: "swap",
});

// metadata: is one of the Next.js convention
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
