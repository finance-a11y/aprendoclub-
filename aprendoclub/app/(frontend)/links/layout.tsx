import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlaces | aprendoclub",
  description: "Todos los enlaces importantes de aprendoclub en un solo lugar.",
  alternates: {
    canonical: "https://aprendoclub.com/links",
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
