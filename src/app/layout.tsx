import {
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Serif,
  Noto_Serif_Armenian,
} from "next/font/google";
import { getLocale } from "next-intl/server";

// Serif headings over a sans body is what gives the reference design its
// editorial voice. Noto's serif and sans share metrics and both ship Armenian
// and Cyrillic, so hy and ru read in the same voice as en.
const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
  weight: ["400", "600", "700"],
});

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      className={`${notoSerif.variable} ${notoSerifArmenian.variable} ${notoSans.variable} ${notoSansArmenian.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-body">
        {children}
      </body>
    </html>
  );
}
