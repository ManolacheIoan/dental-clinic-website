"use client";

import { useSearchParams } from "next/navigation";
import { BookingForm } from "./BookingForm";

/** Precompletează serviciul din adresă (?serviciu=albire). */
export function BookingFormWithParams() {
  const params = useSearchParams();
  const service = params.get("serviciu") ?? "";
  return <BookingForm key={service} initialService={service} />;
}
