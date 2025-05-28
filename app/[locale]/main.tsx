import Nav from "@/app/components/nav";
import { Page } from "@/config";
import Container from "../components/container";
import Footer from "../components/footer";

export default function Main({
  children,
  locale,
  page,
}: {
  children: React.ReactNode;
  locale: "en" | "fi" | undefined;
  page: Page | string;
}) {
  return (
    <main className="my-16 px-4 text-center">
      <Nav locale={locale} page={page} />
      <Container>{children}</Container>
      <Footer locale={locale} page={page} />
    </main>
  );
}
