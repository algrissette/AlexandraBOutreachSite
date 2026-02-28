import axios from "axios";


export const api = axios.create({
    baseURL: "cozy-creativity-57a7928b58.strapiapp.com/api",
    withCredentials: true,
})

export type Year = {
    Description: string,
    Year: string | number,
    createdAt: string,
    documentId: string,
    id: number,
    photographies: PhotographRefs[],
    publishedAt: string,
    thumbnail1: Image,
    thumbnail2: Image,
    thumnail3: Image,
    updatedAt: string


}

export type PhotographRefs = {
    Description: string,
    Location: string,
    Title: string,
    createdAt: string,
    documentId: string,
    id: number,
    publishedAt: string,
    uid: string
    updatedAt: string

}

export type Image = {
    alternativeText: string,
    caption: string,
    createdAt: string,
    documentId: string,
    ext: string,
    name: string,
    height: number,
    width: number,
    url: string
}