import { Link } from "@tanstack/react-router";
import { ANNOUNCEMENTS } from "@/lib/catalog";

export function AnnouncementBar() {
  const loop = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div className="relative overflow-hidden bg-fg text-primary-fg">
      <Link
        to="/collections/$slug"
        params={{ slug: "pets" }}
        className="flex min-h-10 items-center"
        aria-label="Ofertas da loja"
      >
        <div className="ac-marquee flex w-max gap-10 py-2.5 pr-10 text-[11px] font-semibold tracking-[0.14em] uppercase">
          {loop.map((msg, i) => (
            <span key={`${msg}-${i}`} className="shrink-0">
              {msg}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
