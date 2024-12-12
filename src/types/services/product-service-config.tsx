declare type ProductCategory = "Báo" | "Sách" | "Văn phòng phẩm";

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

declare type GetProductPayload = {
    ma_san_pham: string,
};