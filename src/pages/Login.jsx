import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";

export default function Login() {
  usePageTitle("Login");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero title="Login" />
      <div className="mx-auto max-w-[480px] px-5 py-12">
        {submitted ? (
          <p className="text-center text-[16px] text-[#1f2937]">
            This public site preview does not connect to live member accounts. Use{" "}
            <TextLink href="http://members.ijas.org" external>
              members.ijas.org
            </TextLink>{" "}
            or{" "}
            <TextLink href="http://ijas.zfairs.com" external>
              ijas.zfairs.com
            </TextLink>{" "}
            for official login.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="block">
              <span className="mb-1 block text-[14px] text-[#374151]">Email</span>
              <input
                type="email"
                required
                className="w-full rounded-sm border border-[#d1d5db] px-3 py-2 text-[15px]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[14px] text-[#374151]">Password</span>
              <input
                type="password"
                required
                className="w-full rounded-sm border border-[#d1d5db] px-3 py-2 text-[15px]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center border-[1.5px] border-[#222] text-[15px] text-[#1f2937]"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
}
