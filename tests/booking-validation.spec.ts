import { expect, test } from "@playwright/test";
import { isValidPhone, validateBooking } from "../lib/booking";

const ok = { nume: "Ana Pop", telefon: "0722123456", serviciu: "albire", zi: "Luni", mesaj: "", acord: true };

test("validare: telefoane românești", () => {
  for (const p of ["0722 123 456", "+40 722 123 456", "0040722123456", "0236-000-456", "0722.123.456"])
    expect(isValidPhone(p), p).toBe(true);
  for (const p of ["12345", "0822123456", "07221234", "+44 7911 123456", "telefon"]) expect(isValidPhone(p), p).toBe(false);
});

test("validare: date corecte și greșite", () => {
  expect(validateBooking(ok)).toEqual({});
  expect(Object.keys(validateBooking({ ...ok, nume: "A1", acord: false, zi: "" })).sort()).toEqual(["acord", "nume", "zi"]);
  expect(validateBooking({ ...ok, nume: "Ștefan-Ilie Țurcanu" })).toEqual({});
  expect(validateBooking({ ...ok, mesaj: "x".repeat(501) }).mesaj).toBeTruthy();
});
