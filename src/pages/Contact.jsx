import PageHero from "@/components/PageHero";
import TextLink from "@/components/TextLink";
import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";

const topics = [
  "Website Feedback",
  "Fair Feedback",
  "General Inquiry",
  "Project Concerns",
  "Registration",
  "Other",
];

export default function Contact() {
  usePageTitle("Contact Us");
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero title="Contact Us" />
      <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8">
        <div className="bg-[#F3F4F6] px-6 py-8 text-center text-[#1f2937] md:px-10 md:py-10">
          <h2 className="text-[24px] font-semibold md:text-[28px]">
            Sponsors, do you have a question or concern?
          </h2>
          <p className="mt-3 text-[17px] md:text-[18px]">
            Fill out the form below,{" "}
            <TextLink to="/competition/regionals">contact your regional chair</TextLink> or IJAS at{" "}
            <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>
          </p>
          <h2 className="mt-8 text-[24px] font-semibold md:text-[28px]">
            Students, do you have a question or concern?
          </h2>
          <p className="mt-3 text-[17px] md:text-[18px]">
            Fill out the form below, check out the FAQs, ask your sponsor, or contact IJAS at{" "}
            <TextLink href="mailto:info@ijas.org">info@ijas.org</TextLink>
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-[#E4EAF1] p-5 md:p-8">
          {sent ? (
            <p className="py-10 text-center text-[18px] font-medium text-ijas-navy">
              Thank you. Your message has been recorded. For urgent questions, email{" "}
              <a href="mailto:info@ijas.org" className="underline">
                info@ijas.org
              </a>
              .
            </p>
          ) : (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <Field label="First Name *" name="firstName" required />
              <Field label="Last name *" name="lastName" required />
              <Field label="Email *" name="email" type="email" required />
              <Field label="Region Number" name="region" />
              <fieldset className="md:col-span-1">
                <legend className="mb-2 text-[14px] text-[#374151]">What are you contacting us about?</legend>
                <div className="space-y-1.5">
                  {topics.map((topic) => (
                    <label key={topic} className="flex items-center gap-2 text-[14px] text-[#1f2937]">
                      <input type="radio" name="topic" value={topic} className="h-4 w-4" />
                      {topic}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field label="Subject" name="subject" />
              <label className="block md:col-span-2">
                <span className="mb-1 block text-[14px] text-[#374151]">Message</span>
                <textarea
                  name="message"
                  rows={8}
                  className="w-full rounded-sm border border-[#d1d5db] bg-white px-3 py-2 text-[15px]"
                />
              </label>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center bg-ijas-navy px-8 text-sm font-medium text-white hover:bg-[#0a2f63]"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[14px] text-[#374151]">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-sm border border-[#d1d5db] bg-white px-3 py-2 text-[15px]"
      />
    </label>
  );
}
