import Header from "@/components/header";
import Separator from "@/components/separator";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function NotHomeLayout({ children }: Props) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <Separator />
      </div>
      <main>{children}</main>
    </>
  );
}
