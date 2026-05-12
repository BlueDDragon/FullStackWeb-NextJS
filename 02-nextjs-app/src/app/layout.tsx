import "@/app/globals.css"
import style from "@/app/global-layout.module.css"
import Link from "next/link";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={style.container}>
        <header>
          <Link href={"/"}>Home</Link>
        </header>
        <main>{children}</main>
        <footer>
          <p>양파마켓: 010-1234-5678</p>
        </footer>
      </body>
    </html>
  );
}