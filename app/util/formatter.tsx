import React from "react";

export const formatter = (text: string) => {
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
};
