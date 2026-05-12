import style from "@/components/sale-item.module.css"
import Link from "next/link";
import Image from "next/image";
import { SaleData } from "@/types/SaleData";
import { ENV } from "@/env"

type SaleItemProps = {
    item: SaleData;
}

export default function SaleItem({ item }: SaleItemProps) {
    const { id, productName, description, price, userName, photo } = item;
    const imageURL = `${ENV.IMAGE_URL}/${photo}`;

    return (
        <Link className={style.container} href={`/sale/${id}`}>
            <Image className={style.image} src={imageURL} width={100} height={100} alt={`${productName}.pic`}/>
            <div>
                <div className={style.title}>{productName}</div>
                <div className={style.description}>{description}</div>
                <div className={style.price}>{price.toLocaleString()}원</div>
            </div>
        </Link>
    );
}