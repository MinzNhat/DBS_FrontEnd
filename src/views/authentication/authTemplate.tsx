"use client";
import Image from "next/image";
import LoginForm from "./form/login";
import RegisterForm from "./form/register";
import { ResetForm } from "./form/forgotPassword";
import { useState } from "react";
export default function AuthView() {
    const [view, setView] = useState<'login' | 'register' | 'reset'>('login');
    return (
        <div className="w-screen h-screen flex lg:flex-row flex-col items-center">
            <div className=" bg-lightContainerPrimary h-full w-full flex-1 px-4 grid place-items-center pt-20 pb-4">
                {view === 'login' && < LoginForm setView={setView} />}
                {view === 'register' && < RegisterForm setView={setView} />}
                {view === 'reset' && < ResetForm setView={setView} />}
            </div>
            <div className="w-1/2 h-full relative hidden lg:block">
                <Image
                    src="/authentication/AlphaSolutions.webp"
                    alt="AlphaSolutions"
                    fill
                    className="w-full h-full top-0 left-0 object-cover"
                />
            </div>
        </div>
    );
}