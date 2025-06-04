import React from "react";
import Nav from "../nav/nav";

export default function Footer({ locale }: { locale: "en" | "fi" }) {
  return (
    <footer className="z-0">
      <Nav locale={locale} footer />
      <div className="flex flex-row mt-32 pb-12">
        <div className="flex-1"></div>
        <div className="flex-1">
          <button></button>
          <small className="uppercase opacity-80">legal</small>
          
        </div>
      </div>
    </footer>
  );
}
