import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academia SEO + IA | Especialízate en SEO + IA con aprendoclub ",
  description:
    "Deja de improvisar tu carrera. Únete a la comunidad de SEO y AIO para marketers que buscan mejores sueldos, clientes de alto valor y acompañamiento real. ¡Especialízate con nosotros!",
  keywords:
    "SEO, IA, aprendoclub, marketing digital, cursos SEO, comunidad SEO, mentoría SEO",
  metadataBase: new URL("https://aprendoclub.com"),
  openGraph: {
    title: "Especialízate en SEO + IA con aprendoclub | Academia de SEO Y AIO",
    description:
      "Deja de improvisar tu carrera. Únete a la comunidad de SEO y AIO para marketers que buscan mejores sueldos, clientes de alto valor y acompañamiento real.",
    url: "https://aprendoclub.com",
    siteName: "aprendoclub",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "aprendoclub - Academia de SEO + IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Especialízate en SEO + IA con aprendoclub | Academia online",
    description:
      "Deja de improvisar tu carrera. Únete a la comunidad de SEO y SEO + IA para marketers que buscan mejores sueldos, clientes de alto valor y acompañamiento real.",
    images: ["/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
