"use client";

import { PhotographRefs, Year } from "@/app/hooks/apicall";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Gallery() {

    let { photo } = useParams()
    const [photography, setPhotography] = useState<any>([]);

    useEffect(() => {
        const getParent = async () => {

            if (photo) {

                try {
                    const res = await axios.get(
                        `http://localhost:1337/api/years/${photo}?populate=*`,
                        {
                            headers: {
                                Authorization: "Bearer 9557e320422e1ab0b06d5b0e6d90bf6d6fb283a88f5b78d88fe00df3d8d4f5939d4813f6aa4ef1b1db5232ca92f5e9cb433c8fb8699b274680b67843588815d51d1718e5069fcd6891f40fde50dfdfd02cd7a351c47d4f5c77f833b7c4e364f80da9f7e77c240ac84fde2bfd1c034e467f818e33dc093aee598da41edaf26dea"
                            }
                        }
                    );
                    console.log(photo)
                    console.log(res.data.data)
                    return res.data.data as Year



                }
                catch (err) {
                    console.log(err)
                    return null

                }
            }
            else return null

        }

        const getPhotographyId = async (parent: Year) => {
            if (parent != null) {
                const photographyList = parent.photographies
                console.log(photographyList)
                const list = photographyList.map((item) => {
                    return item.documentId
                })
                return list
            }
            else {
                return null
            }

        }

        const getPhotos = async (PhotographsId: string[]) => {
            if (PhotographsId.length > 0) {
                const photosArray = PhotographsId.map(async (item) => {
                    try {
                        console.log("item", item)
                        const res = await axios.get(`http://localhost:1337/api/photographies?filters[documentId][$eq]=${item}&populate=*`,
                            {
                                headers: {
                                    Authorization: "Bearer 9557e320422e1ab0b06d5b0e6d90bf6d6fb283a88f5b78d88fe00df3d8d4f5939d4813f6aa4ef1b1db5232ca92f5e9cb433c8fb8699b274680b67843588815d51d1718e5069fcd6891f40fde50dfdfd02cd7a351c47d4f5c77f833b7c4e364f80da9f7e77c240ac84fde2bfd1c034e467f818e33dc093aee598da41edaf26dea"
                                }
                            }
                        )
                        console.log("data", res.data)

                        return res.data.data

                    }
                    catch (err) {
                        console.log(err)
                    }
                })

                return photosArray

            }
            else {
                return null
            }

        }
        async function populateInfo() {
            const parentData = await getParent()
            console.log(parentData, "Parent!")
            if (parentData) {
                const photographId = await getPhotographyId(parentData)
                if (photographId) {
                    const photos = getPhotos(photographId)
                    setPhotography(photos)
                    console.log("photos", photos)
                }

            }

        }
        populateInfo()


    }, [])
    return (<h1> Hello</h1>)
}

