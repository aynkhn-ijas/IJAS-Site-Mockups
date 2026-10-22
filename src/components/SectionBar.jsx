export default function SectionBar({ children, tone = "navy", as: Tag = "h2" }) {
  const background = tone === "green" ? "bg-ijas-green" : "bg-ijas-navy";
  return (
    <div className={`${background} px-5 py-7 text-center text-white md:py-9`}>
      <Tag className="text-[30px] font-medium leading-tight md:text-[40px]">{children}</Tag>
    </div>
  );
}
