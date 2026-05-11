import style from "@/app/Home.module.css";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <div className={style.searchbar_container}>
                <input type="text" placeholder="검색어를 입력하세요..."/>
                <button>검색</button>
            </div>
            {children}
        </div>
    );
}