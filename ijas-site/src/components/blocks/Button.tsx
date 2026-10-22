import ButtonLink from "./ButtonLink";

type Props = { label: string; href: string };

export default function Button({ label, href }: Props) {
  return (
    <div className="mt-6 flex justify-center">
      <ButtonLink label={label} href={href} className="w-full max-w-3xl" />
    </div>
  );
}