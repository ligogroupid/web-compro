// PRD: prd-remove-dummy-fallback — Reusable notice for empty CMS sections

type Props = {
  sectionName: string;
  className?: string;
};

export default function SectionNotice({ sectionName, className = "" }: Props) {
  return (
    <div
      className={`w-full py-12 flex items-center justify-center ${className}`}
    >
      <div className="border-2 border-dashed border-gray-300 rounded-lg px-8 py-6 text-center">
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          [{sectionName} / Data Not Found]
        </p>
      </div>
    </div>
  );
}
