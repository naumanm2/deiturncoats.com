"use client";

import React, { useState } from "react";
import Nav from "../nav/nav";
import Modal from "../nav/modal";
import { formatter } from "@/app/util/formatter";
import Link from "next/link";

export default function Footer({
  locale,
  legal,
}: {
  locale: "en" | "fi";
  legal: { headline: string; paragraph: string };
}) {
  const [legalOpen, setLegalOpen] = useState(false);
  console.log(legal.headline);
  return (
    <footer className="z-0">
      <Nav locale={locale} footer />
      <div className="flex flex-row mt-24 md:mt-32 pb-12">
        <div className="flex-1 max-md:hidden"></div>
        <div className="flex-1 px-2">
          <button onClick={() => setLegalOpen(true)} className="cursor-pointer">
            <small className="uppercase opacity-80">legal</small>
          </button>

          {legalOpen && (
            <Modal
              locale={locale}
              visible={legalOpen}
              onClose={() => setLegalOpen(false)}
              headline={legal.headline}
            >
              {({ onClose }) => (
                <>
                  <div className="mt-4">{formatter(legal.paragraph)}</div>
                  <button
                    className="w-full p-2 mt-4 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out"
                    onClick={onClose}
                  >
                    <span className="font-bold text-center w-full text-white">
                      {locale == "fi" ? "Sulje" : "Close"}
                    </span>
                  </button>
                </>
              )}
            </Modal>
          )}
        </div>
      </div>
    </footer>
  );
}
