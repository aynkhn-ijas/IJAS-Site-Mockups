export default function Placeholder({ label }: { label: string }) {
    return (
      <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg border-2 border-dashed border-ijas-gray p-8 text-center text-ijas-ink/60">
        {label}
      </div>
    );
  }