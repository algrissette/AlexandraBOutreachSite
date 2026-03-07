import { Geist, Geist_Mono } from "next/font/google";
import "./narratives.css"
import Navbar from "@/components/navbar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body >

                {children}
            </body>
        </html>
    );
}
