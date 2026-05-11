import SaleItem from "@/components/sale-item";
import SearchBarLayout from "@/components/searchbar-layout";
import { fetchSales } from "@/utils/fetch-sales";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// 서버 함수라서 브라우저 함수를 사용할 수 없음(ex. useRouter 등)
// context: GetServerSidePropsContext 사용
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const q = context.query.q;
    const sales = await fetchSales(q as string);

    return { props: { sales: sales } };
}

// function의 이름은 상관하지 않음
// index.tsx 파일의 export default된 함수를 찾아서 참조함
export default function Page({sales}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <section>
                {sales.map((sale) => <SaleItem key={sale.id} item={sale}/>)}
            </section>
        </div>
    );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};