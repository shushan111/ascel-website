import { Google_Sans, Noto_Sans, Noto_Sans_Armenian } from "next/font/google";
import { getLocale } from "next-intl/server";

// Option B — Premium medical. Google Sans carries headings and figures: it is
// one of only two sans families on Google Fonts with properly drawn Armenian,
// and it ships Cyrillic too, so hy, ru and en headings share one design.
// Noto Sans (+ its Armenian companion) carries everything read at length.
const googleSans = Google_Sans({
  subsets: ["latin", "latin-ext", "cyrillic", "armenian"],
  variable: "--font-google-sans",
  display: "swap",
  weight: ["400", "500"],
});

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
  weight: ["400", "500"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${googleSans.variable} ${notoSans.variable} ${notoSansArmenian.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-body">
        {children}
      </body>
    </html>
  );
}
