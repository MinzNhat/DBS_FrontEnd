"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import LoadingUI from "@/components/loading";
import bookData from "@/variables/lottie.json";
import ThemeSwitcher from "@/components/theme";
import { motion, useAnimation } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

const LandingPage = () => {
    const router = useRouter();
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const handleNextClick = () => {
        setLoading(true);
        router.push("/orders");
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleNextClick();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        setIsAnimated(true);
        return () => {
            setIsAnimated(false);
        };
    }, []);

    useEffect(() => {
        const bookTimer = setTimeout(() => {
            document.querySelector(".book")?.classList.add("open");

            const contentTimer = setTimeout(() => {
                document.querySelector(".fade-content")?.classList.add("fade-in");
            }, 500);

            return () => clearTimeout(contentTimer);
        }, 600);

        return () => clearTimeout(bookTimer);
    }, []);

    return (
        <div>
            <div className="relative float-right h-full min-h-screen w-full bg-white lg:!bg-gray-100 dark:!bg-[#191a1a]">
                <main className={`mx-auto min-h-screen`}>
                    <div className="relative flex h-screen lg:p-8 xl:p-16">
                        <div className={`mx-auto min-h-full h-full w-full relative rounded-xl bg-white dark:!bg-[#242526]`}>
                            <div className={`ribbon hidden z-20 lg:block absolute bg-white transition-all shadow-3xl duration-1000 
                            ${isAnimated ? "-top-2 right-4 -scale-x-100" : "-top-2 right-[calc(100%-152px)]"}`}>
                                <div className={`w-28 h-28 flex place-items-center transition-all duration-1000 
                                ${isAnimated ? "-scale-x-100" : ""}`}>
                                    <Image src="/favicon.ico" alt="Your image" width={250} height={250} />
                                </div>
                                <div className={`w-full flex justify-center mt-4 ${isAnimated ? "-scale-x-100" : ""}`}>
                                    <ThemeSwitcher version="1" />
                                </div>
                            </div>
                            <motion.div
                                ref={section1Ref}
                                initial="hidden"
                                animate={controls1}
                                className={`lg:w-[50%] xl:w-[45%] w-full absolute top-0 px-4 sm:px-8 md:px-32 lg:px-16 transition-all flex justify-center h-full lg:py-2 duration-1000 ${isAnimated ? "lg:left-0" : "lg:left-[50%] xl:left-[55%]"}`}>
                                <div className="no-scrollbar grid w-full">
                                    <div className="w-full flex-col px-2 flex gap-4 justify-center place-items-stretch py-4">
                                        <div className="book-container relative">
                                            <div className="book">
                                                <div className="back"></div>
                                                <div className="page6"></div>
                                                <div className="page5"></div>
                                                <div className="page4"></div>
                                                <div className="page3"></div>
                                                <div className="page2"></div>
                                                <div className="page1"></div>
                                                <div className="front"></div>
                                            </div>
                                            <div className="absolute flex justify-between flex-col gap-2 text-center fade-content place-items-center">
                                                <h4 className="text-5xl font-bold text-navy-700">
                                                    Chào mừng
                                                </h4>
                                                <p className="text-base text-gray-600 w-[180px] md:w-full">
                                                    Vui lòng nhấn vào nút bên dưới để tiếp tục
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-16">
                                            <Button
                                                onClick={loading ? () => { } : handleNextClick}
                                                className="linear h-12 w-full rounded-xl bg-blue-500 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 
                                                dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400 dark:active:bg-blue-300 flex justify-center place-items-center"
                                            >
                                                {loading ? <LoadingUI /> : "Vào Adorable Library"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                            <motion.div
                                ref={section2Ref}
                                initial="hidden"
                                animate={controls2}
                                className={`absolute top-0 hidden h-full bg-blue-500 lg:block lg:w-[50%] xl:w-[55%] transition-all duration-1000  ${isAnimated ? "left-[50%] xl:left-[45%] rounded-r-xl" : "left-0 rounded-l-xl"}`}>
                                <div className={`relative h-full w-full flex flex-col justify-between`}>
                                    <div className={`text-white lg:text-3xl xl:text-4xl h-[7.5rem] transition-all duration-1000 w-full flex justify-center font-semibold place-items-center text-center
                                        ${isAnimated ? "pl-8 pr-48" : "pr-10 pl-48"}
                                    `}>
                                        <div className="h-full flex place-items-center mt-4">Thân thiện, dễ dàng sử dụng</div>
                                    </div>
                                    <div className={`w-full h-full grow flex justify-center place-items-end relative overflow-clip ${isAnimated ? "-scale-x-100" : ""}`}>
                                        <div className="cloud dark:!bg-[#242526]" />
                                        <Lottie animationData={bookData} className="h-9/12 w-9/12 absolute bottom-4 right-[calc(50%+30px)] translate-x-1/2" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;