export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stomy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NoneSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
