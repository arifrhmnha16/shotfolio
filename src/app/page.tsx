import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { TemplateGallery } from "@/components/template-gallery";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F2EA] text-[#1F1B16]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TemplateGallery />
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-16">
          <div className="noise overflow-hidden rounded-[1.5rem] border border-[#E8DED1] bg-[#1F1B16] p-5 text-white shadow-2xl shadow-[#4B3824]/15 sm:rounded-[2rem] sm:p-12">
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D9B17C] sm:text-sm sm:tracking-[0.18em]">
                  Ready for your next case study
                </p>
                <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Give every project the cover it deserves.
                </h2>
              </div>
              <Button asChild size="lg" variant="accent">
                <Link href="/generator">
                  Start Creating
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#E8DED1] px-5 py-8 text-center text-sm text-[#8A7F73] sm:px-8">
        Created for developers who care about presentation.
      </footer>
    </div>
  );
}
