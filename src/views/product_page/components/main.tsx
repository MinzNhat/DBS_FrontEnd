"use client";

import TableSwitcher from "@/components/table";
import CustomButtonTable from "@/views/custom_table_button";
import { columnsData } from "../variables/columnsData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductsOperation } from "@/services/products-service";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";
import RenderCase from "@/components/render";
import { FaBookOpen } from "react-icons/fa";
import DetailPopup from "@/components/popup";
import Container from "@/components/container";
import { IoReloadOutline } from "react-icons/io5";
import LoadingUI from "@/components/loading";
import CustomButton from "@/components/button";
import CustomInputField from "@/components/input";

type AddFields = {
    id: keyof ProductCreateDetails | keyof ProductCreateAdditionalDetails,
    type: InputTypes,
    important?: boolean,
    label: string,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition,
    disable?: boolean,
}

type UpdateFields = {
    id: keyof ProductDetailData,
    type: InputTypes,
    important?: boolean,
    label: string,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition,
    disable?: boolean,
}

const ProductsMain = () => {
    const productOp = new ProductsOperation();
    const [loading, setLoading] = useState<boolean>(false);
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductData[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { addSubmitNotification } = useSubmitNotification();
    const [currentSize, setCurrentSize] = useState<number>(10);
    const { addDefaultNotification } = useDefaultNotification();
    const [selectedRows, setSelectedRows] = useState<ProductData[]>([]);
    const [productDetail, setProductDetail] = useState<ProductDetailData>();
    const [productCategory, setProductCategory] = useState<ProductCategoryEN[]>(["newspaper"]);
    const [productCategory2, setProductCategory2] = useState<ProductCategoryEN[] | 'none'[]>(["none"]);
    const [addDetail, setAddDetail] = useState<ProductCreateDetails>({
        employee_id: 1,
        gia_niem_yet: 0,
        so_luong_kha_dung: 0,
        ten_vat_pham: "",
        time_of_entry: ""
    });

    const [addDetail2, setAddDetail2] = useState<ProductCreateAdditionalDetails>({
        nsx: "",
        loai_hang: ""
    });

    const addFields: Array<AddFields> = [
        { id: "ten_vat_pham", label: "Tên vật phẩm", type: "text", important: true },
        { id: "gia_niem_yet", label: "Giá niêm yết", type: "number", important: true },
        { id: "so_luong_kha_dung", label: "Số lượng khả dụng", type: "number", important: true },
        { id: "employee_id", label: "Mã nhân viên", type: "number", important: true },
        { id: "time_of_entry", label: "Ngày nhập", type: "date", important: true, dropdownPosition: "top" },
    ];

    const addFields2 = useMemo((): AddFields[] => {
        switch (productCategory[0]?.toLowerCase()) {
            case "book":
                return [
                    { id: "ms_copy", label: "Mã sao chép", type: "text", important: true },
                    { id: "tac_gia", label: "Tác giả", type: "text", important: true },
                    { id: "tinh_trang", label: "Tình trạng", type: "text", important: true },
                    { id: "nsx", label: "Nhà xuất bản", type: "text", important: true },
                ];
            case "newspaper":
                return [
                    { id: "tap_chi", label: "Tạp chí", type: "text", important: true },
                    { id: "so_bao", label: "Số báo", type: "number", important: true },
                    { id: "toa_soan", label: "Toà soạn", type: "text", important: true },
                ];
            case "stationery":
                return [
                    { id: "loai_hang", label: "Loại hàng", type: "text", important: true },
                    { id: "nsx", label: "Nhà sản xuất", type: "text", important: true },
                ];
            default:
                return [];
        }
    }, [productCategory]);

    const addFields3: Array<UpdateFields> = [
        { id: "ma_san_pham", label: "Mã sản phẩm", type: "text", disable: true },
        { id: "ten_san_pham", label: "Tên sản phẩm", type: "text", important: true },
        { id: "gia_niem_yet", label: "Giá niêm yết", type: "number", important: true },
        { id: "so_luong_kha_dung", label: "Số lượng khả dụng", type: "number", important: true },
        { id: "stationery_nsx", label: "Nhà sản xuất", type: "text", important: true },
        { id: "loai_hang", label: "Loại hàng", type: "text", important: true },
    ];

    const handleReload = () => {
        setAddDetail({
            employee_id: 1,
            gia_niem_yet: 0,
            so_luong_kha_dung: 0,
            ten_vat_pham: "",
            time_of_entry: ""
        });
        setAddDetail2({
            nsx: "",
            loai_hang: ""
        })
    }

    const updateValue = (id: keyof ProductCreateDetails, value: string | string[] | number) => {
        setAddDetail(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const updateValue2 = (id: keyof ProductCreateAdditionalDetails, value: string | string[] | number) => {
        setAddDetail2(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const updateValue3 = (id: keyof ProductDetailData, value: string | string[] | number) => {
        setProductDetail((prev) =>
            prev ? { ...prev, [id]: value } : prev
        );
    };

    const reloadData = useCallback(async () => {
        setProducts(undefined);
        let response
        if (productCategory2[0] === 'none') {
            response = await productOp.getAllProducts();
        } else {
            response = await productOp.getProducByCategory({ category: productCategory2[0] })
        }

        if (response.data) setProducts(response.data);
    }, [currentPage, currentSize, productCategory2]);

    const fetchProduct = async (ma_san_pham: string) => {
        const response = await productOp.getProduct({ ma_san_pham: ma_san_pham });
        if (response.data) setProductDetail(response.data);
    }

    const handleSubmit = async () => {
        if (loading) return;
        const missingFields: string[] = [];

        addFields.forEach(({ id, label, important }) => {
            if (important && !addDetail[id as keyof ProductCreateDetails]) {
                missingFields.push(label);
            }
        });

        addFields2.forEach(({ id, label, important }) => {
            if (important && !addDetail2[id as keyof ProductCreateAdditionalDetails]) {
                missingFields.push(label);
            }
        });

        if (missingFields.length > 0) {
            addDefaultNotification({
                message: `Vui lòng nhập đầy đủ thông tin: ${missingFields.join(", ")}`,
            });
            return;
        }

        addSubmitNotification({ message: 'Xác nhận tạo sản phẩm?', submitClick: handleCreate })
    };

    const handleSubmit2 = async () => {
        if (loading) return;
        const missingFields: string[] = [];

        addFields3.forEach(({ id, label, important }) => {
            if (important && productDetail && !productDetail[id as keyof ProductDetailData]) {
                missingFields.push(label);
            }
        });

        if (missingFields.length > 0) {
            addDefaultNotification({
                message: `Vui lòng nhập đầy đủ thông tin: ${missingFields.join(", ")}`,
            });
            return;
        }

        addSubmitNotification({ message: 'Xác nhận cập nhật sản phẩm?', submitClick: handleUpdate })
    };

    const handleUpdate = async () => {
        setLoading(true);

        const payload: UpdateProductPayload = {
            id_item: parseInt(productDetail?.ma_san_pham || "1"),
            ten_vat_pham: productDetail?.ten_san_pham || "",
            gia_niem_yet: productDetail?.gia_niem_yet || 0,
            so_luong_kha_dung: productDetail?.so_luong_kha_dung || 0,
            additionalDetails: {
                loai_hang: productDetail?.loai_hang || "",
                nsx: productDetail?.stationery_nsx || "",
            },
        };

        try {
            const response = await productOp.updateProduct(payload);

            if (!response.error) {
                addDefaultNotification({ message: "Cập nhật sản phẩm thành công!" });
                reloadData();
            } else {
                addDefaultNotification({ message: "Cập nhật sản phẩm thất bại!" });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            addDefaultNotification({ message: "Đã xảy ra lỗi khi cập nhật sản phẩm!" });
        } finally {
            setLoading(false);
        }
    };

    const convertDateToISOString = (dateString: string, timeString: string = "00:00:00") => {
        const [day, month, year] = dateString.split("/").map(Number); // Chia nhỏ ngày, tháng, năm
        const [hours, minutes, seconds] = timeString.split(":").map(Number); // Thêm thời gian nếu có

        const dateObject = new Date(year, month - 1, day, hours || 0, minutes || 0, seconds || 0);

        return dateObject.toISOString();
    };

    const handleCreate = async () => {
        setLoading(true);
        const additionalDetails = (() => {
            switch (productCategory[0].toLowerCase()) {
                case "book":
                    return {
                        ms_copy: addDetail2.ms_copy || "",
                        tac_gia: addDetail2.tac_gia || "",
                        tinh_trang: addDetail2.tinh_trang || "",
                        nsx: addDetail2.nsx || ""
                    };
                case "newspaper":
                    return {
                        tap_chi: addDetail2.tap_chi || "",
                        so_bao: addDetail2.so_bao || 0,
                        toa_soan: addDetail2.toa_soan || ""
                    };
                case "stationery":
                    return {
                        loai_hang: addDetail2.loai_hang || "",
                        nsx: addDetail2.nsx || ""
                    };
                default:
                    throw new Error("Danh mục không hợp lệ");
            }
        })();
        const payload: CreateProductPayload = {
            ...addDetail,
            time_of_entry: convertDateToISOString(addDetail.time_of_entry ?? "", "14:30:00"),
            category: productCategory[0],
            additionalDetails: additionalDetails,
        };

        try {
            const response = await productOp.createProduct(payload);

            if (!response.error) {
                addDefaultNotification({ message: "Thêm sản phẩm thành công!" });
                reloadData();
                setOpenAdd(false);
            } else {
                addDefaultNotification({ message: "Thêm sản phẩm thất bại!" });
            }
        } catch (error) {
            console.error("Error creating product:", error);
            addDefaultNotification({ message: "Đã xảy ra lỗi khi thêm sản phẩm!" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteButton = () => {
        if (selectedRows.length === 0) {
            addDefaultNotification({ message: "Vui lòng chọn sản phẩm cần xoá" });
            return;
        }
        addSubmitNotification({ message: `Xác nhận xoá ${selectedRows.length} sản phẩm đã chọn?`, submitClick: handleDelete });
    };

    const handleDelete = async () => {
        const productOp = new ProductsOperation();

        const deletePromises = selectedRows.map(async (product) => {
            const response = await productOp.deleteProduct({ ma_san_pham: product.ma_san_pham });
            return response;
        });

        const results = await Promise.all(deletePromises);

        if (results.every(result => !result.error)) {
            addDefaultNotification({ message: "Xoá thành công" });
            reloadData();
        } else {
            addDefaultNotification({ message: "Đã có lỗi khi xoá sản phẩm" });
        }

        setSelectedRows([]);
    };

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <>
            <RenderCase renderIf={!!productDetail}>
                <DetailPopup
                    customWidth="w-fit"
                    title="Chi tiết sản phẩm"
                    onClose={() => setProductDetail(undefined)}
                    icon={<FaBookOpen className="w-full h-full" />}
                    noPadding
                >
                    <div className="relative">
                        <div className="flex flex-col gap-2 xl:gap-4 px-2 pb-1">
                            {addFields3.map(({ id, type, label, version, isClearable, options, select_type, state, important, dropdownPosition, disable }: UpdateFields) => (
                                <CustomInputField
                                    id={id}
                                    key={id}
                                    type={type}
                                    disabled={disable}
                                    value={productDetail ? productDetail[id] : ""}
                                    setValue={(value: string | string[] | number) => updateValue3(id, value)}
                                    version={version}
                                    options={options}
                                    select_type={select_type}
                                    isClearable={isClearable}
                                    dropdownPosition={dropdownPosition}
                                    inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
                                    label={
                                        <div className='flex gap-1 relative mb-2'>
                                            {label} {important && <div className="text-red-500">*</div>}
                                        </div>
                                    } />
                            ))}
                        </div>
                        <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                            <CustomButton
                                version="1"
                                color="error"
                                onClick={handleSubmit2}
                                className="linear w-full rounded-md bg-blue-500 dark:!bg-blue-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-blue-600 
                            active:bg-blue-700 dark:text-white dark:hover:bg-blue-400 dark:active:bg-blue-300 flex justify-center place-items-center"
                            >
                                {loading ? <LoadingUI /> : "Xác nhận"}
                            </CustomButton>
                        </Container>
                    </div>
                </DetailPopup>
            </RenderCase>
            <RenderCase renderIf={openAdd}>
                <DetailPopup
                    customWidth="w-fit"
                    title="Thêm sản phẩm"
                    onClose={() => setOpenAdd(false)}
                    icon={<FaBookOpen className="w-full h-full" />}
                    noPadding
                >
                    <div className="relative">
                        <div className="flex flex-col gap-2 xl:gap-4 px-2 pb-1 xl:grid xl:grid-cols-2 xl:w-[700px]">
                            <div className="flex flex-col gap-2">
                                <div className="py-1 font-bold text-center">Thông tin sản phẩm</div>
                                <CustomInputField
                                    id="category"
                                    key="category"
                                    type="select"
                                    value={productCategory}
                                    setValue={(value: string[]) => setProductCategory(value as ProductCategoryEN[])}
                                    options={[{ label: "Báo", value: "newspaper" }, { label: "Sách", value: "book" }, { label: "Văn phòng phẩm", value: "stationery" }]}
                                    select_type="single"
                                    isClearable={false}
                                    inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
                                    label={
                                        <div className='flex gap-1 relative mb-2'>
                                            Thể loại sản phẩm <div className="text-red-500">*</div>
                                        </div>
                                    } />
                                {addFields.map(({ id, type, label, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                    <CustomInputField
                                        id={id}
                                        key={id}
                                        type={type}
                                        value={addDetail[id as keyof ProductCreateDetails]}
                                        setValue={(value: string | string[] | number) => updateValue(id as keyof ProductCreateDetails, value)}
                                        version={version}
                                        options={options}
                                        select_type={select_type}
                                        isClearable={isClearable}
                                        dropdownPosition={dropdownPosition}
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
                                        label={
                                            <div className='flex gap-1 relative mb-2'>
                                                {label} {important && <div className="text-red-500">*</div>}
                                            </div>
                                        } />
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="py-1 font-bold text-center">Thông tin thêm</div>
                                {addFields2.map(({ id, type, label, version, isClearable, options, select_type, state, important, dropdownPosition }: AddFields) => (
                                    <CustomInputField
                                        id={id}
                                        key={id}
                                        type={type}
                                        value={addDetail2[id as keyof ProductCreateAdditionalDetails]}
                                        setValue={(value: string | string[] | number) => updateValue2(id as keyof ProductCreateAdditionalDetails, value)}
                                        version={version}
                                        options={options}
                                        select_type={select_type}
                                        isClearable={isClearable}
                                        dropdownPosition={dropdownPosition}
                                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
                                        label={
                                            <div className='flex gap-1 relative mb-2'>
                                                {label} {important && <div className="text-red-500">*</div>}
                                            </div>
                                        } />
                                ))}
                            </div>
                        </div>
                        <Container className="sticky bottom-0 w-full p-2 !rounded-none flex gap-1.5">
                            <CustomButton
                                version="1"
                                color="error"
                                onClick={handleReload}
                                className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-blue-500 dark:!border-blue-500 h-10 text-base font-medium transition duration-200 hover:border-blue-600 
                            active:border-blue-700 text-blue-500 dark:text-white dark:hover:border-blue-400 dark:active:border-blue-300 flex justify-center place-items-center"
                            >
                                <IoReloadOutline />
                            </CustomButton>
                            <CustomButton
                                version="1"
                                color="error"
                                onClick={handleSubmit}
                                className="linear w-full rounded-md bg-blue-500 dark:!bg-blue-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-blue-600 
                            active:bg-blue-700 dark:text-white dark:hover:bg-blue-400 dark:active:bg-blue-300 flex justify-center place-items-center"
                            >
                                {loading ? <LoadingUI /> : "Xác nhận"}
                            </CustomButton>
                        </Container>
                    </div>
                </DetailPopup>
            </RenderCase >
            <TableSwitcher
                primaryKey="ma_san_pham"
                tableData={products}
                isPaginated={false}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={reloadData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                onRowClick={(value) => { fetchProduct(value.ma_san_pham) }}
                customButton={
                    <div className="flex gap-2">
                        <div className="w-full">
                            <CustomInputField
                                id="category"
                                key="category"
                                type="select"
                                className="w-64"
                                value={productCategory2}
                                setValue={(value: string[]) => setProductCategory2(value as ProductCategoryEN[] | 'none'[])}
                                options={[{ label: "Báo", value: "newspaper" }, { label: "Sách", value: "book" }, { label: "Văn phòng phẩm", value: "stationery" }, { label: "Tìm kiếm theo thể loại: Không", value: "none" }]}
                                select_type="single"
                                isClearable={false}
                                inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-w-96"
                            />
                        </div>

                        <CustomButtonTable fetchData={reloadData} handleDelete={handleDeleteButton} selectedRows={selectedRows} openAdd={() => { setOpenAdd(true) }} />

                    </div>

                }
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

export default ProductsMain;