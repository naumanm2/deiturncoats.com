import React from "react";
import Nav from "./nav";
import { Page } from "@/config";

export default function Footer({
  locale,
  page,
}: {
  locale: "en" | "fi" | undefined;
  page: Page | string;
}) {
  return (
    <footer className="pb-48">
      <Nav locale={locale} page={page} />
    </footer>
  );
}
