import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Ir al contenido principal
      </a>
      <Navbar />
      <main
        id="main"
        className="flex min-h-screen w-full flex-col scroll-mt-[72px]"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
