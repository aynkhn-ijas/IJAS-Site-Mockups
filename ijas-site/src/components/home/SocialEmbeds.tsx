function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.7 6a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 17.7 6z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M3 3h5.2l4.1 5.8L17.8 3H21l-7.2 8.2L21.4 21h-5.3l-4.5-6.3L6.1 21H3l7.7-8.8L3 3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H4v11h2.5V9zM5.2 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM20 20h-2.5v-5.6c0-1.8-.8-2.4-1.8-2.4s-2 .9-2 2.5V20H11V9h2.4v1.5c.6-1 1.8-1.8 3.3-1.8 2.4 0 3.3 1.6 3.3 4.6V20z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="3" fill="#ff0033" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="white" />
    </svg>
  );
}

export default function SocialEmbeds() {
  return (
    <section className="bg-white">
      <div className="bg-ijas-navy px-4 py-6 text-center text-white">
        <h2 className="text-[28px] font-bold sm:text-[32px]">Check us out on Social Media!</h2>
        <div className="mt-4 flex items-center justify-center gap-5">
          <a href="https://www.instagram.com/ijas_il" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/IJASorg" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://x.com/ijasorg" aria-label="X">
            <XIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/illinois-junior-academy-of-science-a02159365"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a href="https://www.youtube.com" aria-label="YouTube">
            <YouTubeIcon />
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1100px] gap-8 px-4 py-10 lg:grid-cols-2">
        <article className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-black/10 p-4">
            <img
              src="/assets/ijas-seal-small.png"
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold">ijas_il</p>
              <p className="truncate text-sm text-neutral-500">Illinois Jr Academy of Science</p>
            </div>
            <span className="ml-auto rounded-md bg-sky-500 px-3 py-1 text-sm font-semibold text-white">
              Follow
            </span>
          </div>
          <div className="grid grid-cols-3 gap-px bg-neutral-200">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-300/80" />
            ))}
          </div>
          <div className="flex gap-6 px-4 py-3 text-sm text-neutral-600">
            <span>
              <strong className="text-ijas-ink">268</strong> posts
            </span>
            <span>
              <strong className="text-ijas-ink">620</strong> followers
            </span>
          </div>
        </article>

        <article className="overflow-hidden rounded-xl border border-black/10 bg-[#f0f2f5] shadow-sm">
          <div className="flex items-center gap-3 bg-white p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-lg font-bold text-white">
              f
            </div>
            <div>
              <p className="font-semibold">Illinois Junior Academy of Science</p>
              <p className="text-xs text-neutral-500">Facebook page preview</p>
            </div>
          </div>
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center text-neutral-500">
            <p>Facebook embed placeholder</p>
            <p className="mt-1 text-sm">Live site loads an official Facebook plugin here.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
