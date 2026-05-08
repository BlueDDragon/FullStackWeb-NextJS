import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <h1>Sale Page</h1>
            <p>num: {id} product</p>
        </div>
    );
}