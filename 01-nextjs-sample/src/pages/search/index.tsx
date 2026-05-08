import SearchBarLayout from "@/components/searchbar-layout";
import { useRouter } from "next/router";

// function의 이름은 상관하지 않음
// index.tsx 파일의 export default된 함수를 찾아서 참조함
export default function Page() {
    const router = useRouter();
    const query = router.query.q;
    
    return (
        <div>
            <h1>Search Page</h1>
            <p>{query}</p>
            <p>{router.query.name}</p>
            <p>{router.query.age}</p>
        </div>
    );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};