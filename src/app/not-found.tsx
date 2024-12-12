import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <div className="h-dvh w-dvh flex justify-center place-items-center text-center flex-col">
            <h2 className="text-xl font-bold">404 Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className="underline text-blue-500">
                Return Home
            </Link>
        </div>
    );
}