import SaleItem from "@/components/sale-item";
import { ENV } from "@/env"
import { SaleData } from "@/types/SaleData";

// 기본적으로 SSR로 실행
export default async function Page({ searchParams }: { searchParams: Promise<{q: string}> }) {
    const { q } = await searchParams;   
    
    let url = `${ENV.API_URL}/sales`;
    if (q) url += `?q=${q}`;

    const response = await fetch(url);
    const data = await response.json();
    const sales: SaleData[] = data.documents;

    return (
        <div>
            <section>
                <p><span style={{color:'red'}}>'{q}'</span>를 검색하셨습니다.</p>
                {sales.map((sale) => <SaleItem key={sale.id} item={sale}/>)}
            </section>
        </div>
    );
}
