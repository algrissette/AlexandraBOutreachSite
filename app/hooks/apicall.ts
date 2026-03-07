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

export type Photograph = {
    Description: string,
    Location: string,
    Photos: Image[]
    Title: string,
    createdAt: string,
    documentId: string,
    id: number,
    publishedAt: string,
    uid: string
    updatedAt: string
    year: Year

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

export type Article = {
    Content: Content[]
    Date: string
    Description: string
    Title: string
    thumbnail: Image
    collaborators: any
    createdAt: string
    documentId: string
    id: number
    publishedAt: string
    updatedAt: string
    Images: Image[]
}

export type Content = {
    type: string
    level?: number
    children?: RichTextNode[]
}

export type RichTextNode = {
    text?: string
    type?: string,
    bold?: boolean
    italic?: boolean
    underline?: boolean
    url?: string
}

export type RichImageNode = {
    text: string,
    key: number,
    srclink: string,
    bold?: boolean
    italic?: boolean
    underline?: boolean
    type?: string,

}