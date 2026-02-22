interface Props {
  width?: number;
}

export default function Icon__ArrowRight({ width = 14 }: Props) {
  return (
    <svg
      width={width}
      // height={12}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="aspect-[14/12]"
    >
      <path
        d="m13.829 6.424-5.25 5.4a.575.575 0 0 1-.825 0 .61.61 0 0 1 0-.849L12.008 6.6H.583a.57.57 0 0 1-.412-.176.61.61 0 0 1 0-.848.57.57 0 0 1 .412-.176h11.425L7.754 1.025a.61.61 0 0 1 0-.85.576.576 0 0 1 .825 0l5.25 5.4A.6.6 0 0 1 14 6a.6.6 0 0 1-.171.424"
        fill="currentColor"
        // fill="#1c3687"
      />
    </svg>
  );
}
