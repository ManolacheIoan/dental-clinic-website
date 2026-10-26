import { CLINIC_NAME } from "@/config/site";

/** Simbolul clinicii: un dinte care zâmbește, cu o steluță de strălucire. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="30" cy="34" r="28" fill="#1AA6A6" />
      <path
        d="M30 17c-6-5-19-4-19 10 0 9 4 13 5 21 1 9 3 15 7 15s3-10 7-10 3 10 7 10 6-6 7-15c1-8 5-12 5-21 0-14-13-15-19-10Z"
        fill="#fff"
        stroke="#20303A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M22 35q8 10 16 0" fill="none" stroke="#20303A" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="24" cy="29" r="2.2" fill="#20303A" />
      <circle cx="36" cy="29" r="2.2" fill="#20303A" />
      <path
        d="M52 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z"
        fill="#FFC93C"
        stroke="#20303A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark className="logo__mark" />
      <span className="logo__name">{CLINIC_NAME}</span>
    </span>
  );
}
