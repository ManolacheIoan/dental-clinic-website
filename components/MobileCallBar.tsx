import Link from "next/link";
import { site } from "@/config/site";
import { CalendarIcon, PhoneIcon } from "./icons";

/** Bară fixă doar pe telefon: „Sună acum” mereu la îndemână. */
export function MobileCallBar() {
  return (
    <div className="callbar">
      <a href={site.phone.href} className="callbar__call">
        <PhoneIcon />
        <span>Sună acum</span>
      </a>
      <Link href="/programare/" className="callbar__book">
        <CalendarIcon />
        <span>Programare</span>
      </Link>
    </div>
  );
}
