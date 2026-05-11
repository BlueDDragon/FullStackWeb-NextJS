import { SaleData } from "@/types/SaleData";

async function fetchData<T>(url: string) : Promise<T[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (!data || data === null) throw new Error();

        return data.documents;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchSales(q?: string) : Promise<SaleData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/sales`;
    if (q) apiURL += `?q=${q}`;

    return await fetchData(apiURL);
}

export async function fetchRecentSales(q?: string) : Promise<SaleData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/sales/recent`;
    if (q) apiURL += `?q=${q}`;

    return await fetchData(apiURL);
}

export async function fetchSaleById(id: number, q?: string) : Promise<SaleData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/sales/${id}`;
    if (q) apiURL += `?q=${q}`;

    return await fetchData(apiURL);
}