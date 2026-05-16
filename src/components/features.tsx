"use client";

import { motion } from "framer-motion";
import { Download, Eye, Laptop, LayoutTemplate } from "lucide-react";

const features = [
  { title: "HD Export", icon: Download, copy: "Export polished PNG assets at portfolio-ready resolutions." },
  { title: "Live Preview", icon: Eye, copy: "Every title, badge, screenshot, and layout choice updates instantly." },
  { title: "Device Mockups", icon: Laptop, copy: "Frame projects in browser, floating card, and MacBook-style views." },
  { title: "Custom Templates", icon: LayoutTemplate, copy: "Pick from refined layouts made for case studies and launches." },
];

export function Features() {
  return (
    <section id="features" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B48A57] sm:text-sm sm:tracking-[0.18em]">
            Features
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#1F1B16] sm:text-4xl">
            Everything for a polished first impression
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#8A7F73] sm:text-base">
          A focused creative studio interface for turning raw screenshots into
          presentation-ready project covers.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[#E8DED1] bg-white p-5 shadow-sm shadow-[#4B3824]/5 sm:p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F2EA] text-[#B48A57] sm:mb-8 sm:h-12 sm:w-12">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-[#1F1B16]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#8A7F73]">{feature.copy}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
