import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const MonoSans = localFont({
  src: [
    { path: "/fonts/MonaSans_Expanded-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/MonaSans_Expanded-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/MonaSans_Expanded-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/MonaSans_Expanded-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-monosans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "VenStack",
  description: "Discover top rated vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${MonoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
