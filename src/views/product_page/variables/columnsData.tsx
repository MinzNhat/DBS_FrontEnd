import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<ProductData>[] => {
    const intl = useTranslations("ProductsRoute");

    return [
        {
            Header: intl("id"),
            accessor: "ma_san_pham",
        },
        {
            Header: intl("detailSource"),
            accessor: "ten_san_pham",
        },
        {
            Header: intl("detailDest"),
            accessor: "danh_muc",
        },
        {
            Header: intl("statusCode"),
            accessor: "gia_niem_yet",
        },
        {
            Header: intl("statusCode"),
            accessor: "so_luong_kha_dung",
        },
        {
            Header: intl("statusCode"),
            accessor: "so_luong_ban",
        },
    ];
};