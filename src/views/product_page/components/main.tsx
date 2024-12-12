"use client";

import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { useCallback, useEffect, useState } from "react";

const OrdersMain = () => {
    const intl = useTranslations("OrdersRoute");
    const [orders, setOrders] = useState<OrderData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<OrderData[]>([]);

    const renderHeader = (cellHeader: string): string => {
        if (cellHeader == intl("statusCode")) {
            return "!text-end"
        }
        return "";
    }

    const renderCell = (cellHeader: string, cellValue: string | number | boolean, rowValue: OrderData) => {
        if (cellHeader === intl("statusCode")) {
            return <div className="w-full h-full text-end">{intl(cellValue)}</div>
        } else if (cellHeader === intl("detailSource")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailSource}, ${rowValue.wardSource}, ${rowValue.districtSource}, ${rowValue.provinceSource}`}</div>
        } else if (cellHeader === intl("detailDest")) {
            return <div className="w-full h-full line-clamp-4">{`${rowValue.detailDest}, ${rowValue.wardDest}, ${rowValue.districtDest}, ${rowValue.provinceDest}`}</div>
        }
    };

    const reloadData = useCallback(async () => {

    }, [currentPage, currentSize]);

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <TableSwitcher
                primaryKey="id"
                tableData={orders}
                isPaginated={true}
                renderCell={renderCell}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                renderHeader={renderHeader}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={reloadData} handleDelete={() => { }} selectedRows={selectedRows} />}
                containerClassname="!rounded-xl p-4"
                selectType="multi"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
            />
        </>
    );
}

export default OrdersMain;