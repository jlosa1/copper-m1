import { Logo } from "@/components/copper/logo";

// "dark" scopes the dark theme to the footer, so it is Night Sky (with the
// light wordmark) in both light and dark mode.
export function SiteFooter() {
  return (
    <footer data-testid="site-footer" className="dark bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="w-40" />
        <p className="text-muted-foreground text-sm">
          Fictional — for educational use.
        </p>
      </div>
    </footer>
  );
}
