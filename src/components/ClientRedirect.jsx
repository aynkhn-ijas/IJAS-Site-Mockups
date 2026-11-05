"use client";

import { asset } from "@/lib/asset";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientRedirect({ to }) {
  const router = useRouter();
  const href = asset(to);

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16 text-center text-[#1f2937]">
      <p className="text-[16px]">This page has moved.</p>
      <p className="mt-3">
        <a href={href} className="font-semibold text-ijas-navy underline">
          Continue to the updated page
        </a>
      </p>
    </main>
  );
}
