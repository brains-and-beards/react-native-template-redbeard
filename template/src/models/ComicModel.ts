export interface Comic {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly imageUrl: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseComic = (json: any): Comic => ({
  id: json.num,
  title: json.title,
  description: json.alt,
  imageUrl: json.img
})
