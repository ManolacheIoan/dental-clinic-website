"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/config/site";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Meniul se închide singur când se schimbă pagina.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo" aria-label="Acasă">
          <Logo />
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="meniu-principal"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((o) => !o);
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span>Meniu</span>
        </button>
        <nav id="meniu-principal" className={`nav${open ? " nav--open" : ""}`} aria-label="Principal">
          <ul className="nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/programare/" className="btn btn--sun nav__cta">
            Programează-te
          </Link>
        </nav>
      </div>
    </header>
  );
}
