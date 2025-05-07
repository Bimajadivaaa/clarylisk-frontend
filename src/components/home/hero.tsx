/* eslint-disable no-restricted-imports */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Flame, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/img/newlogo.png";
import Link from "next/link";

export default function Hero() {
  // State for client-side generated random values
  const [gridItems, setGridItems] = useState<
    Array<{
      opacity: number;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  // Generate random values ONLY on the client side after component mount
  useEffect(() => {
    const items = Array.from({ length: 144 }).map(() => ({
      opacity: Math.random() * 0.5 + 0.1,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 10}s`,
    }));
    setGridItems(items);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background grid animation - Rendered only on client side to avoid hydration errors */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
        {gridItems.map((item, i) => (
          <div
            key={i}
            className="border border-white/10"
            style={{
              opacity: item.opacity,
              animationDelay: item.animationDelay,
              animationDuration: item.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Animated glow effect */}
      <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container px-4 mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600 flex items-center justify-center">
            <span className="ml-10">Clarylisk</span>
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="ml-[-3rem]"
            />
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
          Transforming online gambling donations into positive impact through
          transparent blockchain technology
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Link href="/register">Register as Creator</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-black hover:bg-white/10"
          >
            Learn How It Works
          </Button>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4 p-3 rounded-full bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-white">
                <span className="font-bold">1000,000 IDRX</span> burned
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5">
              <BarChart3 className="w-4 h-4 text-green-500" />
              <span className="text-white">
                <span className="font-bold">5,243</span> Creator Registered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
