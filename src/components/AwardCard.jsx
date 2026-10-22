const DOT = {
  gold: "bg-[#C6A15B]",
};

const DOT_LABEL = {
  gold: "Gold award",
};

export default function AwardCard({ title, students, awards = [], medal, highlight = null, variant = "medal" }) {
  const prominent = variant === "special";
  const accent =
    highlight === "epic"
      ? "border-l-[3px] border-l-ijas-maroon"
      : highlight === "special" || prominent
        ? "border-l-[3px] border-l-ijas-navy"
        : "";
  const frame = prominent
    ? "border-[#75A8ED] bg-white px-3.5 py-2.5"
    : "border-[#e5e7eb] bg-ijas-wash px-3 py-2";

  return (
    <article className={`winner-card rounded border ${frame} ${accent}`}>
      <p className={`flex items-start gap-2 font-bold leading-snug text-ijas-ink ${prominent ? "text-base" : "text-[15px]"}`}>
        {DOT[medal] ? (
          <span className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${DOT[medal]}`}>
            <span className="sr-only">{DOT_LABEL[medal]}. </span>
          </span>
        ) : null}
        <span>{title}</span>
      </p>
      {awards.map((award) => {
        const epic = /epic/i.test(award);
        const awardClass = epic
          ? "mt-1.5 text-[15px] font-bold leading-snug text-ijas-maroon"
          : prominent
            ? "mt-1.5 text-[15px] font-bold leading-snug text-ijas-navy"
            : "mt-1 text-[13px] font-bold leading-snug text-ijas-navy";
        return (
          <p key={award} className={awardClass}>
            {award}
          </p>
        );
      })}
      <p className="mt-1 text-[13px] leading-snug text-[#374151]">{students}</p>
    </article>
  );
}
