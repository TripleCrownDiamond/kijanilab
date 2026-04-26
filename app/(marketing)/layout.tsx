import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(90,220,120,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(57,140,82,0.2),transparent_34%)]" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
