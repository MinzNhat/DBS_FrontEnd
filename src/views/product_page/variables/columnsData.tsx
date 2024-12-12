import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<ProductData>[] => {
    const intl = useTranslations("ProductsRoute");

    return [
        {
            Header: intl("ten_san_pham"),
            accessor: "ten_san_pham",
        },
        {
            Header: intl("danh_muc"),
            accessor: "danh_muc",
        },
        {
            Header: intl("gia_niem_yet"),
            accessor: "gia_niem_yet",
        },
        {
            Header: intl("so_luong_kha_dung"),
            accessor: "so_luong_kha_dung",
        },
        {
            Header: intl("so_luong_ban"),
            accessor: "so_luong_ban",
        },
    ];
};