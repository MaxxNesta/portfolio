const footerLinks = [
  { label: "GitHub", href: "https://github.com/MaxxNesta" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="px-10 py-10 border-t border-line flex flex-wrap justify-between items-center gap-5">
      <p className="font-mono text-[11px] text-muted">© 2025 Maxx Nesta</p>
      <div className="flex gap-6">
        {footerLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-mono text-[11px] text-muted hover:text-ink transition-colors duration-200 cursor-none"
            aria-label={`${label} profile`}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
