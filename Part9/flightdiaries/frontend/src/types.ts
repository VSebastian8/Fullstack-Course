import { z } from "zod";

export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export const DiarySchema = z.object({
  id: z.number(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
});

export const DiaryEntriesSchema = z.array(DiarySchema);

export type DiaryEntry = z.infer<typeof DiarySchema>;

interface DiaryWithComment extends DiaryEntry {
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryWithComment, "id">;
