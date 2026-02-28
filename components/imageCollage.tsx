export default function Collage() {
    return (
        <section className="relative w-full h-[950px] overflow-hidden ">

            {/* Image 1 */}
            <div
                className="absolute top-16 left-20 z-20 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 20}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img1.jpg"
                    className="w-[750px]  "
                />
            </div >

            {/* Image 2 */}
            < div
                className="absolute top-0 left-[38%] z-30 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 10}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img2.jpg"
                    className="w-[820px]  "
                />
            </div >

            {/* Image 3 */}
            < div
                className="absolute bottom-0 right-32 z-40 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 30}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img3.jpg"
                    className="w-[800px]  "
                />
            </div >

            {/* Image 4 */}
            < div
                className="absolute top-50  right-54 z-50 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 20}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img4.jpg"
                    className="w-[820px]  "
                />
            </div >

            {/* Image 5 */}
            < div
                className="absolute bottom-0 right-0 z-60 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 10}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img5.jpg"
                    className="w-[760px]  "
                />
            </div >

            {/* Image 6 */}
            < div
                className="absolute top-[55%] left-[48%] z-70 opacity-0 scale-95 animate-pop "
                style={{ animationDelay: `${Math.random() * 10}s` }
                }
            >
                <img
                    src="/HomePage/Collage/img6.jpg"
                    className="w-[600px]  "
                />
            </div >

        </section >
    );
}