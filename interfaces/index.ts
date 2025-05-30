// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces'; 

export interface Family {
  baseVariantImages: string[]
  slug: string
  title: string
  uuid: string
  familyPrice?: {
    min?: number
    max?: number
  }
}

export type Car = {
  slug: string
  title: string
  uuid: string
  type: string
  makeableId: number
  families: Family[]
}

export type PageData = {
  uri: string
  id: string
  date: string
  title: string | null
  slug: string
  excerpt: string | null
  content: string | null
}
