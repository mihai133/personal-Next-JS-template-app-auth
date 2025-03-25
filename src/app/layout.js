import "./globals.css";
import Navigation from "../components/Navigation";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Next.js Blog Template",
  description: "A blog built with Next.js",
  keywords: "next.js, blog, template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserratFont.className}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
