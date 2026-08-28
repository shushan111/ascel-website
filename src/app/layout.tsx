import { Plus_Jakarta_Sans, Noto_Sans, Noto_Sans_Armenian } from "next/font/google";
import { getLocale } from "next-intl/server";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-armenian",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoCyrillic = Noto_Sans({
  subsets: ["cyrillic", "cyrillic-ext"],
  variable: "--font-noto-cyrillic",
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
      className={`${plusJakarta.variable} ${notoArmenian.variable} ${notoCyrillic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
