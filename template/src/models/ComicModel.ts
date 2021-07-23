export interface Comic {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
}

export const parseComic = (json: any): Comic => ({
  id: json.num,
  title: json.title,
  description: json.alt,
  imageUrl: json.img,
});
