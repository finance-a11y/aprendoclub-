import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
};

export function RelatedLinks({
  title = "Sigue explorando",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  return (
    <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {title}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
