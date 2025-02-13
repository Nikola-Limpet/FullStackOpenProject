import diaries from '../data/entries';

import { DiaryEntry, NoneSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};


const getNonSensitivEntries = (): NoneSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
}

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitivEntries,

};