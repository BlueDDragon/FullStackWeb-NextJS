import style from "@/app/sale/[id]/sale.module.css"
import Image from "next/image";
import { ENV } from "@/env";
import { SaleData } from "@/types/SaleData";
import not_found from "@/app/not-found"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
    let sales: SaleData[];

    try { // 예외처리
        const { id } = await params;
        const response = await fetch(`${ENV.API_URL}/sales/${id}`);
        const data = await response.json();
        sales = data.documents;
    }
    catch (err) {
        console.error(err);
        return not_found();
    }
    
    if (!sales || sales.length === 0) {
        return not_found();
    }

    const { productName, description, price, userName, photo } = sales[0];
    const imageURL = `${ENV.IMAGE_URL}/${photo}`;

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
