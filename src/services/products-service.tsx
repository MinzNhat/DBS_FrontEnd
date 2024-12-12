import axios, { AxiosResponse } from "axios";

export class ProductsOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_LOGIN_ENDPOINT!}/products`;
    }

    async getAllProducts() {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/dashboard`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: response.data as ProductData[] }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };

    async getAllProduct(payload: GetProductPayload) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/dashboard/${payload.ma_san_pham}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: response.data as ProductDetailData[] }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };
};