import HeaderGeneral from "@/components/header-general";
import Separator from "@/components/separator";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function NotHomeLayout({ children }: Props) {
  return (
    <>
      <HeaderGeneral />
      <Separator />
      {children}
    </>
  );
}
