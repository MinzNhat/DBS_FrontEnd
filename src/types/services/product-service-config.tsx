declare type ProductCategory = "Báo" | "Sách" | "Văn phòng phẩm";

declare type ProductCategoryEN = "book" | "newspaper" | "stationery";

declare type ProductData = {
    ma_san_pham: string,
    danh_muc: ProductCategory,
    ten_san_pham: string,
    gia_niem_yet: number,
    so_luong_kha_dung: number,
    so_luong_ban: number,
};

declare type ProductDetailData = ProductData & {
    ms_copy?: string,
    tac_gia?: string,
    tinh_trang?: string,
    book_nsx?: Date,
    tap_chi: string,
    so_bao: string,
    toa_soan: string,
    loai_hang?: string,
    stationery_nsx?: string
};

declare type ProductCreateDetails = {
    gia_niem_yet: number;
    ten_vat_pham: string;
    so_luong_kha_dung: number;
    time_of_entry?: string;
    employee_id: number;
};

declare type ProductCreateAdditionalDetails = {
    loai_hang?: string;
    nsx?: string;
    ms_copy?: string;
    tac_gia?: string;
    tinh_trang?: string;
    tap_chi?: string;
    so_bao?: number;
    toa_soan?: string;
};

declare type CreateProductPayload = ProductCreateDetails & { category: ProductCategoryEN; } & { additionalDetails: ProductCreateAdditionalDetails };

declare type ProductUpdateAdditionalDetails = {
    loai_hang: string,
    nsx: string
};

declare type ProductUpdateDetails = {
    id_item: number,
    ten_vat_pham: string,
    gia_niem_yet: number,
    so_luong_kha_dung: number,
};

declare type UpdateProductPayload = ProductUpdateDetails & {
    additionalDetails: ProductUpdateAdditionalDetails
};

declare type GetProductPayload = {
    ma_san_pham: string,
};

declare type DeleteProductPayload = GetProductPayload;

declare type FilterProductPayload = {
    category: ProductCategoryEN,
};