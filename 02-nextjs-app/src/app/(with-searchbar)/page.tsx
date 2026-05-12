import style from "@/app/(with-searchbar)/page.module.css"
import SaleItem from "@/components/sale-item";
import { SaleData } from "@/types/SaleData";
import { ENV } from "@/env"

// 기본적으로 Server 컴포넌트
// 인터렉션 상호작용 기능은 Server 컴포넌트에서 불가능
// use client로 변환해서 클라이언트 컴포넌트로 바꿔줄 수 있음
export default async function Home() {
  const response = await fetch(`${ENV.API_URL}/sales/recent`, { next: { revalidate: 10 } }); // { cache: "no-store" }
  const data = await response.json();
  const sales: SaleData[] = data.documents;

  return (
    <div>
      <h1 className={style.title}>Hello Next.js</h1>
      <section>
        {sales.map((sale) => <SaleItem key={sale.id} item={sale}/>)}
      </section>
    </div>
  );
}
