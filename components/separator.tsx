export default function Separator({ scale = 40 }: { scale?: number }) {
  return (
    <div className="h-2 grid grid-cols-[35%_1fr] relative">
      <div className="bg-primary-red"></div>
      <div className="bg-primary-blue"></div>
    </div>
  );
}
