"use client";

import PageHero from "@/components/PageHero";
import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";

export default function UpdateAwards() {
  usePageTitle("Update Awards");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/update-awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));
      setResult({
        ok: response.ok,
        message: data.message || (response.ok ? "Awards updated." : "The update failed."),
        details: data.warnings || data.errors || [],
      });
    } catch {
      setResult({ ok: false, message: "The update could not reach the server.", details: [] });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <PageHero title="Update Awards" />
      <div className="mx-auto max-w-[760px] px-5 py-10 md:px-8 md:py-12">
        <p className="text-[16px] leading-relaxed text-[#374151]">
          Adult members edit the Google Sheet. Press the button below to publish those edits on the Awards and Project
          Database pages.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#374151]">
          Put each award on its own line, or separate awards with semicolons or vertical bars. Silver, bronze,
          canceled, and no-show rows are left off the site.
        </p>
        <p className="mt-3 text-[15px]">
          <a
            href="https://docs.google.com/spreadsheets/d/1_Rnd4z6QSpr4iiONl-s0H5XSHkDV4VjBHhtA6RLYhDA/edit"
            className="font-semibold text-ijas-navy underline-offset-2 hover:underline"
          >
            Open the Google Sheet
          </a>
        </p>
        <form onSubmit={onSubmit} className="mt-8 rounded-xl border border-[#75A8ED] bg-white p-6 md:p-8">
          <label htmlFor="admin-password" className="block text-[14px] font-semibold text-ijas-navy">
            Admin password
            <input
              id="admin-password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-[16px] font-normal text-[#374151]"
              required
            />
          </label>
          <button
            type="submit"
            disabled={pending || password.length === 0}
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-ijas-navy px-6 py-4 text-center text-[18px] font-semibold text-white transition-colors hover:bg-[#0c3268] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Updating awards…" : "Update Awards from Google Sheet"}
          </button>
          {result ? (
            <div
              role="status"
              className={`mt-6 rounded-md px-4 py-3 text-[15px] leading-relaxed ${
                result.ok ? "bg-[#e7f3eb] text-[#245536]" : "bg-[#fde8ec] text-[#631D33]"
              }`}
            >
              <p>{result.message}</p>
              {result.details.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {result.details.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}
