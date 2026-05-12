'use client';

import style from "@/components/searchbar.module.css"
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchBar() {
    const router = useRouter();
    const query = useSearchParams().get('q');
    const [search, setSearch] = useState(query || '');
    
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSubmitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmitSearch();
    };

    const handleSubmitSearch = () => {
        if (!search || query === search) return;
        router.push(`/search?q=${search}`);
    };

    return (
        <div className={style.searchbar_container}>
            <input type="text" placeholder="검색어를 입력하세요..." value={search} onChange={handleChangeSearch} onKeyDown={handleSubmitKeyDown}/>
            <button onClick={handleSubmitSearch}>검색</button>
        </div>
    );
}