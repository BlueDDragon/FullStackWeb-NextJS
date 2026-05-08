import SearchBarLayout from '@/components/searchbar-layout';
import style from '../styles/index.module.css'
import sales from '@/mock/sales.json'
import SaleItem from '@/components/sale-item';

export default function Home() {
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