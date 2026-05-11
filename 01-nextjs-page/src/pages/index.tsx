import SearchBarLayout from '@/components/searchbar-layout';
import style from '@/styles/index.module.css'
import SaleItem from '@/components/sale-item';
import { fetchRecentSales, fetchSales } from '@/utils/fetch-sales';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';

// SSR 방식
// export async function getServerSideProps() {
//   const sales = await fetchRecentSales();

//   return { props: { sales: sales } };
// }

// SSG 방식
export async function getStaticProps() {
  const sales = await fetchRecentSales();

  return { props: { sales: sales } };
}

export default function Home({sales}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1 className={style.title}>Hello Next.js</h1>
      <section>
        {sales.map((sale) => <SaleItem key={sale.id} item={sale}/>)}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};