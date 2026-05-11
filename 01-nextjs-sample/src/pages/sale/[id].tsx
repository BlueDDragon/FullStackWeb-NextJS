import { useRouter } from "next/router";
import sales from "@/mock/sales.json"
import style from "@/styles/[id].module.css"
import Image from "next/image";
import { fetchSaleById, fetchSales } from "@/utils/fetch-sales";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import NotFound from "@/pages/404"

// SSR 방식
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const id = context.params!.id; // ! : optional 속성에 강제 래핑
//     const sales = await fetchSaleById(parseInt(id as string));

//     return { props: { sales: sales } };
// }

export async function getStaticPaths() {
    const sales = await fetchSales();
    return {
        paths: [ ...sales.map((sale) => ({ params: { id: String(sale.id) } })) ], // id는 문자열
        fallback: 'blocking',
    };
}

// SSG 방식
export async function getStaticProps(context: GetStaticPropsContext) {
    const id = context.params!.id; // ! : optional 속성에 강제 래핑
    const sales = await fetchSaleById(parseInt(id as string));

    return { props: { sales: sales }, revalidate: 10 }; // 증분생성(10초마다)
}

export default function Page({sales}: InferGetServerSidePropsType<typeof getStaticProps>) {
    if (!sales || sales.length === 0) {
        return NotFound();
    }

    const { id, productName, description, price, userName, photo } = sales[0];
    const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${photo}`;

    return (
        <div className={style.container}>
            <div className={style.cover_img_container} style={{backgroundImage: `url('${imageURL}')`}}>
                <Image className={style.cover_img} src={imageURL} width={300} height={300} alt={`${productName}.pic`}/>
            </div>
            <div className={style.title}>{productName}</div>
            <div className={style.price}>{price.toLocaleString()}원</div>
            <div className={style.description}>{description}</div>
        </div>
    );
}
