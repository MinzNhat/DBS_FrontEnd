"use client";

import { useState } from "react";
import { RootState } from "@/store";
import InfoContent from "./userInfo";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/dropdown";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";

const Avatar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const intl = useTranslations("Navbar");

    const [openInfo, setOpenInfo] = useState<boolean>(false);
    // const [openPass, setOpenPass] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();

    const handleLogout = () => {
        addSubmitNotification({ message: intl("LogoutMessage"), submitClick: handleLogoutLogic })
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    const handleLogoutLogic = () => {
        router.push("/");
    };

    return (
        <>
            <RenderCase renderIf={openInfo}>
                <DetailPopup onClose={handleCloseInfo} title={intl("InfoTitle")}
                    customWidth="w-fit"
                    icon={<FaUserCircle className="w-full h-full" />}>
                    <div className="p-2 flex flex-col gap-2">
                        <InfoContent />
                    </div>
                </DetailPopup>
            </RenderCase>

            <Dropdown
                button={
                    <div className="avatar w-10 h-10 rounded-full">
                        <img
                            src="/avatar.jpg"
                            alt="avatar"
                            width={19200}
                            height={10800}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                }
            >
                <Container className="!absolute -right-1 top-2 flex w-52 flex-col justify-start shadow-xl shadow-shadow-500 dark:text-white dark:shadow-none">
                    <div className="flex flex-col pb-3 px-3">
                        <button
                            onClick={handleLogout}
                            className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                        >
                            {intl("Logout")}
                        </button>
                    </div>
                </Container>
            </Dropdown>
        </>
    );
}

export default Avatar;