import React from "react";
import CTA from "./cta";

export default function Text({
  heading,
  paragraph,
  signature,
  ctaText,
  ctaUrl,
}: {
  heading?: string;
  paragraph: string;
  signature?: string;
  ctaText?: string;
  ctaUrl?: string;
}) {
  function formatToParagraphsWithBoldAndLinks(text: string) {
    return text.split(/\n\s*\n/).map((para, i) => {
      // First split into inline tokens: bold and links
      const tokens = para.split(/(\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);

      return (
        <p key={i} className="mb-2">
          {tokens.map((token, j) => {
            // Bold: *text*
            if (token.startsWith("*") && token.endsWith("*")) {
              return <strong key={j}>{token.slice(1, -1)}</strong>;
            }

            // Link: [text](url)
            if (token.match(/^\[.*\]\(.*\)$/)) {
              const match = token.match(/^\[(.*)\]\((.*)\)$/);
              if (match) {
                const [, label, href] = match;
                return (
                  <a
                    key={j}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    {label}
                  </a>
                );
              }
            }

            // Default text
            return <React.Fragment key={j}>{token}</React.Fragment>;
          })}
        </p>
      );
    });
  }

  return (
    <div className="py-16 md:py-24 flex flex-col md:flex-row gap-8">
      <h2 className="flex-1">{heading}</h2>
      <div className="flex-1 flex flex-col gap-4">
        {formatToParagraphsWithBoldAndLinks(paragraph)}
        {ctaText && ctaUrl && <CTA text={ctaText} primary url={ctaUrl} />}
        {signature && <div className="mt-4">{formatToParagraphsWithBoldAndLinks(signature)}</div>}
      </div>
    </div>
  );
}
