import Link from "next/link";
import style from "@/styles/global-layout.module.css"

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className={style.container}>
            <header>
                <Link href={'/'}>Home</Link>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>양파마켓: 010-1234-5678</p>
            </footer>
        </div>
    );
}