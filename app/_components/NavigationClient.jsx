"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";

export default function NavigationClient({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Cabins", href: "/cabins" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden z-50 text-primary-100"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <Bars3Icon className="h-8 w-8" />
        )}
      </button>

      {/* Navigation Menu */}
      <nav
        className={`
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          sm:translate-x-0 transition-transform duration-300 ease-in-out
          fixed inset-0 bg-primary-950 sm:relative sm:bg-transparent
          flex flex-col sm:flex-row items-center justify-center sm:justify-end
          z-40 gap-8 sm:gap-16 text-2xl sm:text-xl
        `}
      >
        <ul className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-8 h-8 sm:w-7 sm:h-7">
                  <Image
                    src={session.user.image}
                    fill
                    className="rounded-full object-cover"
                    alt="user avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Guest Area
              </Link>
            )}
          </li>

          {session?.user && (
            <li className="sm:hidden w-full">
              <SignOutButton />
            </li>
          )}
        </ul>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
