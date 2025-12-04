import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhaka Coffee Directory - Find the Best Coffee Shops in Dhaka",
  description: "Discover the best coffee shops in Dhaka. Browse reviews, menus, locations, and find your perfect coffee spot in the city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
