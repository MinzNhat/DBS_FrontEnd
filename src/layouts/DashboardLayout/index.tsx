"use client";

import Sidebar from "./sidebar";
import NavigationBar from "./navbar";
import { useScreenView } from "@/hooks/ScreenViewProvider";
import { useSidebarContext } from "@/hooks/SidebarProvider";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { isMD } = useScreenView();
    const { openSidebar } = useSidebarContext();

    return (
        <>
            <Sidebar />
            <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${!isMD && openSidebar ? "ml-[278px]" : ""}`}>
                <NavigationBar />
                <div className="mt-4 mx-auto mb-auto h-[calc(100dvh-144px)] md:h-[calc(100dvh-114px)] pt-2">
                    {children}
                </div>
            </main>
        </>
    );
}

export default DashboardLayout;