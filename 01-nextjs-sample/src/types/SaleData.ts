export type SaleData = {
    id: number;
    productName: string;
    description: string;
    price: number;
    userName: string;
    photo: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    userID?: number | null;
};