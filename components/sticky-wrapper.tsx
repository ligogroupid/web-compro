// "use client";

// import { ReactNode, useSyncExternalStore } from "react";
import { ReactNode } from "react";

// const emptySubscribe = () => () => {};

// function getIsIOS() {
//   const ua = navigator.userAgent;
//   return (
//     /iPad|iPhone|iPod/.test(ua) ||
//     (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
//   );
// }

// export default function StickyWrapper({
//   children,
//   className,
//   top = "0",
// }: {
//   children: ReactNode;
//   className?: string;
//   top?: string;
// }) {
//   const isIOS = useSyncExternalStore(emptySubscribe, getIsIOS, () => false);

//   return (
//     <div
//       className={
//         isIOS
//           ? `relative z-0${className ? ` ${className}` : ""}`
//           : `sticky top-0 z-0${className ? ` ${className}` : ""}`
//       }
//       style={{ top }}
//     >
//       {children}
//     </div>
//   );
// }

export default function StickyWrapper({
  children,
  onScreen = "lg",
}: {
  children: ReactNode;
  top?: string;
  onScreen?: "md" | "lg" | "xl" | "2xl";
}) {
  if (onScreen === "md")
    return <div className="static md:sticky md:top-0 md:z-0">{children}</div>;
  else if (onScreen === "xl")
    return <div className="static xl:sticky xl:top-0 xl:z-0">{children}</div>;
  else if (onScreen === "2xl")
    return (
      <div className="static 2xl:sticky 2xl:top-0 2xl:z-0">{children}</div>
    );
  return <div className="static lg:sticky lg:top-0 lg:z-0">{children}</div>;
}
