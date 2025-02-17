import { z } from "zod";
import { newEntrySchema } from "./utils/toNewDiaryEntry";

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = z.infer<typeof newEntrySchema>;


// export interface DiaryEntry extends NewDiaryEntry {
//   id: number;
// }
export type NoneSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
