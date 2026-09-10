import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-lg font-medium">{item.q}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <p className="overflow-hidden pb-4 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
