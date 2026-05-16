import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DED1]/80 bg-[#F7F2EA]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#1F1B16] text-white shadow-lg shadow-[#1F1B16]/15 sm:h-10 sm:w-10">
            <Sparkles size={17} />
          </span>
          <span className="text-base font-semibold tracking-tight text-[#1F1B16] sm:text-lg">
            Shotfolio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#8A7F73] md:flex">
          <Link href="/#templates" className="transition hover:text-[#1F1B16]">
            Templates
          </Link>
          <Link href="/#examples" className="transition hover:text-[#1F1B16]">
            Examples
          </Link>
          <Link href="/#features" className="transition hover:text-[#1F1B16]">
            Features
          </Link>
        </nav>

        <Button asChild variant="accent" size="sm" className="shrink-0 px-3 text-xs sm:h-11 sm:px-5 sm:text-sm">
          <Link href="/generator">Start Creating</Link>
        </Button>
      </div>
    </header>
  );
}
