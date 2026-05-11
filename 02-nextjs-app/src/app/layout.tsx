import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <header>
        <Link href={'/'}>Home</Link> &nbsp;&nbsp;
        <Link href={'/search'}>Search</Link> &nbsp;&nbsp;
        <Link href={'/search/setting'}>Setting</Link> &nbsp;&nbsp;
        <Link href={'/sale/1'}>Sale</Link> &nbsp;&nbsp;
      </header>
      <body>{children}</body>
    </html>
  );
}
