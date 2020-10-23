import { TagStore as TagStoreModel } from './index'

export as namespace ITagStore

export interface TagStore extends TagStoreModel {}

export interface ITag {
    name: string
    value: string
    label: string
    id: number
}

export interface ICurrentTag {
    value: string
    label: string
    provided: string
}
