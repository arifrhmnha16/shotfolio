"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#E8DED1] bg-white/70 px-3 py-2 text-xs font-medium text-[#8A7F73] shadow-sm sm:mb-6 sm:px-4 sm:text-sm">
          <Layers size={15} className="shrink-0 text-[#B48A57]" />
          <span className="truncate">Premium cover generator for developers</span>
        </div>
        <h1 className="max-w-full text-[clamp(2.15rem,9.2vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-[#1F1B16] lg:text-7xl">
          Turn screenshots into stunning portfolio covers
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#8A7F73] sm:mt-6 sm:text-lg sm:leading-8">
          Upload your website screenshot, customize the layout, and export
          professional project covers in seconds.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
            <Link href="/generator">
              Start Creating
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href="#templates">View Templates</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative w-full"
      >
        <div className="noise overflow-hidden rounded-[1.5rem] border border-[#E8DED1] bg-white p-3 shadow-2xl shadow-[#4B3824]/15 sm:rounded-[2rem] sm:p-4">
          <div className="rounded-[1.15rem] bg-[linear-gradient(135deg,#F6EBDD,#FFFFFF_45%,#D8C2A5)] p-4 sm:rounded-[1.5rem] sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
              <div>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#B48A57] sm:text-sm sm:tracking-[0.22em]">
                  Case Study
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#1F1B16] sm:mt-2 sm:text-3xl">
                  Atlas Studio
                </h2>
              </div>
              <Monitor className="shrink-0 text-[#B48A57]" size={24} />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#E8DED1] bg-white shadow-2xl shadow-[#1F1B16]/20 sm:rounded-2xl">
              <div className="flex h-8 items-center gap-1.5 border-b border-[#E8DED1] bg-[#FBF8F3] px-3 sm:h-10 sm:gap-2 sm:px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D86F59] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E2B866] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#76A879] sm:h-3 sm:w-3" />
              </div>
              <div className="grid min-h-44 grid-cols-[0.8fr_1.2fr] gap-3 bg-[#111111] p-3 sm:min-h-64 sm:gap-5 sm:p-6">
                <div className="rounded-xl bg-[#F7F2EA] p-3 sm:rounded-2xl sm:p-5">
                  <div className="h-3 w-14 rounded-full bg-[#B48A57]/50 sm:h-4 sm:w-20" />
                  <div className="mt-6 h-6 w-20 rounded-full bg-[#1F1B16] sm:mt-8 sm:h-8 sm:w-32" />
                  <div className="mt-3 h-3 w-full rounded-full bg-[#E8DED1]" />
                  <div className="mt-2 h-3 w-4/5 rounded-full bg-[#E8DED1]" />
                </div>
                <div className="rounded-xl bg-white p-3 sm:rounded-2xl sm:p-5">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-14 rounded-lg bg-[linear-gradient(135deg,#F7F2EA,#E8DED1)] sm:h-24 sm:rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
