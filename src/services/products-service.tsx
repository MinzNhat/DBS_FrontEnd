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

    async getProducByCategory(payload: FilterProductPayload) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/${payload.category}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: response.data.product as ProductData[] }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };

    async getProduct(payload: GetProductPayload) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/${payload.ma_san_pham}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: response.data.product as ProductDetailData }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };

    async createProduct(payload: CreateProductPayload) {
        try {
            console.log(payload)
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });
            console.log(response)

            return response.data.success
                ? { error: false, data: null }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };

    async deleteProduct(payload: DeleteProductPayload) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/deleteID/${payload.ma_san_pham}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: null }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };

    async updateProduct(payload: UpdateProductPayload) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/edit`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
            });

            return response.status >= 200 || response.status < 300
                ? { error: false, data: null }
                : { error: true, data: null };
        } catch (err: any) {
            console.log(err);
            return { error: true, data: null };
        }
    };
};