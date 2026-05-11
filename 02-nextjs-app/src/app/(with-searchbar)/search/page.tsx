// 기본적으로 SSR로 실행
export default async function Page(props: { searchParams: Promise<{q: string}> }) {
    const { q } = await props.searchParams;

    return (
        <div>
            <p>Search Page</p>
            <p>q: {q}</p>
        </div>
    );
}
