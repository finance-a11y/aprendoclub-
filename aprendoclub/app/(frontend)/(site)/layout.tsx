import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPayloadClient } from "@/lib/payload";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayloadClient();

  const [settings, programas] = await Promise.all([
    payload.findGlobal({ slug: "site-settings" }),
    payload.find({ collection: "programas", sort: "orden", depth: 0 }),
  ]);

  const navbarProps = {
    siteNav: settings.navbar.siteNav,
    siteCta: settings.navbar.siteCta,
    mobilePanelBlurb: settings.footer.footerMeta.mobilePanelBlurb,
    programMenu: programas.docs.map((p) => ({
      label: p.nombre,
      href: p.ctaHref,
      desc: p.menuDesc ?? "",
      badge: p.menuBadge ?? "",
    })),
  };

  const footerProps = {
    footerColumns: settings.footer.footerColumns,
    footerSocials: settings.footer.footerSocials,
    footerMeta: settings.footer.footerMeta,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Ir al contenido principal
      </a>
      <Navbar {...navbarProps} />
      <main
        id="main"
        className="flex min-h-dvh w-full flex-col scroll-mt-[72px]"
      >
        {children}
      </main>
      <Footer {...footerProps} />
    </>
  );
}
