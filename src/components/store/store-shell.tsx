import { Toaster } from "sonner";
import { AnnouncementBar } from "./announcement-bar";
import { CartDrawer } from "./cart-drawer";
import { SearchDialog } from "./search-dialog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer />
      <SearchDialog />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "!bg-surface !text-fg !border-border !shadow-[var(--shadow-border)]",
        }}
      />
    </div>
  );
}
