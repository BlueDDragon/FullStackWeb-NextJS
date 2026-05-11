export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <header>
                <h4>Header</h4>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h4>footer</h4>
            </footer>
        </div>
    );
}