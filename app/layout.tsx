import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";

export const metadata: Metadata = {
  title: "NICEPAY Shop | Demo Store",
  description: "NICEPAY prebuilt checkout integration demo.",
};

const projectId = "xn5th41lkf";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${projectId}");
          `}
        </Script>
        <Header />
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
