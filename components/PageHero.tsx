import Link from "next/link";

/** Antetul paginilor interioare, cu firimituri și o ilustrație în dreapta. */
export function PageHero({
  title,
  lead,
  crumbs = [],
  art,
  eyebrow,
}: {
  title: string;
  lead?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  art?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <div>
          <nav className="breadcrumbs" aria-label="Firimituri">
            <ol>
              <li>
                <Link href="/">Acasă</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
              <li aria-current="page">{title}</li>
            </ol>
          </nav>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
        {art && <div className="page-hero__art">{art}</div>}
      </div>
    </section>
  );
}
