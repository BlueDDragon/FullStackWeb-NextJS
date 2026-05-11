import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import style from '../styles/searchbar-layout.module.css'

export default function SearchBarLayout({children}: {children: React.ReactNode}) {
    const [search, setSearch] = useState('');

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const router = useRouter();
    const handleSubmitSearch = () => {
        if (!search || router.query.q === search) return;
        router.push(`/search?q=${search}`);
    };

    return (
        <div>
            <div className={style.searchbar_container}>
                <input type="text" placeholder="검색어를 입력하세요..." value={search} onChange={handleChangeSearch}/>
                <button onClick={handleSubmitSearch}>검색</button>
            </div>
            {children}
        </div>
    );
}