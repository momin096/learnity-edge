import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/NavBar";
import NextAuthProvider from "@/providers/NextAuthProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LearnityEdge | Home",
  description: "learning that gives you the edge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <ClickSpark >
              <NavBar />
              {children}
            </ClickSpark>
          </NextAuthProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
