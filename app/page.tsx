import ImageSlideshow from "@/components/imageslideshow";
import Navbar from "@/components/navbar";
export default function Home() {
    return (
        <div className="">


            <section className="flex justify-center border border-red-200">
                <ImageSlideshow />
            </section>
            <Navbar page="Home" />

            <section className="my-5">
                <div className="w-full h-50 flex place-items-center justify-between">
                    <div className="w-[10%] h-1 bg-black justify-self-start"> </div>
                    <div className="flex flex-col">
                        <p> Photographer wuth an interest in</p>
                        <div className="flex justify-center place-items-center">
                            <span className="text-7xl"> Sustainability</span> <span className="mx-2 text-2xl"> and </span> <span className="text-7xl">Progress</span>
                        </div>

                    </div>
                    <div className="w-[10%] h-1 bg-black "> </div>
                </div>
            </section>


            <section>
                <div className="flex justify-between gap-10 w-full px-10">
                    <div className="w-[45%] mx-20">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <p className="text-2xl my-2 tracking-widest" key={index}>SUS·TAIN·ABIL·ITY</p>
                        ))}
                    </div>
                    <div className=""> </div>

                </div>
            </section>


            <section className="text-white w-full m-[50px] flex justify-around border border-blue-900">
                <div className="w-[500px] h-[500px] bg-black"> Photo of ALex</div>
                <div className="w-[500px] h-[500px] bg-black"> Quotes</div>
            </section>

            <section className="w-full flex">
                <div className="w-[50%] h-[50dvh] bg-black ">
                    <h1> Projects I'm </h1> </div>
                <div className="w-[50%] h-[50dvh] "> <h1> Proud Of</h1> </div>



            </section>
            <section className="w-full flex">

                <div className="w-[50%] h-[50dvh] "> </div>
                <div className="w-[50%] h-[50dvh] bg-black "> </div>



            </section>


        </div>
    );
}
