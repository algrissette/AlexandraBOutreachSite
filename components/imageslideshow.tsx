import { useEffect, useState } from "react";

export default function ImageSlideshow() {
    const images = [
        "/HomePage/image6.jpg",
        "/HomePage/image7.jpg",
        "/HomePage/image8.jpg",
        "/HomePage/image9.jpg",
        "/HomePage/image10.jpg",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">

            {/* Background Image */}
            <img
                src={images[index]}
                alt="Alexandra Bradley"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            />

            {/* Subtle Dark Overlay (Luxury Feel) */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Center Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-8">

                <h1
                    className="
            w-full max-w-4xl
            text-center
            text-[clamp(3rem,8vw,6rem)]
            leading-[0.9]
            tracking-[-0.03em]
            uppercase
            font-glacial
            text-white
            font-bold
            italic
          "
                >
                    Alexandra<br />Bradley
                </h1>

            </div>
            {/* Corner Borders */}
            <div className="pointer-events-none absolute inset-0 z-20">

                {/* Top Left */}
                <div className="absolute top-6 left-6 w-35 h-16 border-t border-l border-purple-200/20" />

                {/* Top Right */}
                <div className="absolute top-6 right-6 w-20 h-4 border-t border-r  border-purple-200/20" />

                {/* Bottom Left */}
                <div className="absolute bottom-6 left-6 w-32 h-28 border-b border-l  border-purple-200/20" />

                {/* Bottom Right */}
                <div className="absolute bottom-6 right-6 w-48 h-16 border-b border-r  border-purple-200/20" />

            </div>
        </div>
    );
}