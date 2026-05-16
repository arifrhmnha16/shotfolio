"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/templates";

export function TemplateGallery() {
  return (
    <section id="templates" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B48A57] sm:text-sm sm:tracking-[0.18em]">
            Templates
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#1F1B16] sm:text-4xl">
            Studio presets with room to breathe
          </h2>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/generator">
            Open Generator
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
      <div id="examples" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-2xl border border-[#E8DED1] bg-white shadow-sm shadow-[#4B3824]/5"
          >
            <div className="noise m-3 h-40 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#F7F2EA,#FFFFFF_50%,#D8C2A5)] p-3 sm:m-4 sm:h-48 sm:p-5">
              <div className="h-full rounded-xl border border-white/70 bg-white/70 p-2 shadow-xl shadow-[#1F1B16]/10 sm:rounded-2xl sm:p-3">
                <div className="mb-3 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D86F59]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E2B866]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76A879]" />
                </div>
                <div className="grid h-[calc(100%-22px)] grid-cols-[0.7fr_1fr] gap-2 rounded-xl bg-[#111111] p-2 sm:gap-3 sm:p-3">
                  <div className="rounded-lg bg-[#F7F2EA]" />
                  <div className="space-y-2 rounded-lg bg-white p-3">
                    <div className="h-3 w-1/2 rounded-full bg-[#B48A57]/50" />
                    <div className="h-3 w-full rounded-full bg-[#E8DED1]" />
                    <div className="h-3 w-4/5 rounded-full bg-[#E8DED1]" />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-8 rounded-lg bg-[#F7F2EA] sm:h-10" />
                      <div className="h-8 rounded-lg bg-[#F7F2EA] sm:h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 pt-1 sm:p-5 sm:pt-1">
              <h3 className="text-lg font-semibold text-[#1F1B16]">{template.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#8A7F73]">
                {template.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
