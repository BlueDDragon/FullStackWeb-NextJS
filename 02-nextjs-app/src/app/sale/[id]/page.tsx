import { ReactPromise } from "react";
import styles from "./sale.module.css"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params;

    return (
        <div>
            <p>Sale Page</p>
            <p>sale: {id} product</p>
        </div>
    );
}
