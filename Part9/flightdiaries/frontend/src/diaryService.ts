import axios from "axios";
import {
  DiaryEntriesSchema,
  type DiaryEntry,
  type NewDiaryEntry,
} from "./types";
const baseUrl = "/api/diaries";

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => {
    return DiaryEntriesSchema.parse(response.data);
  });
};

const create = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

export default { getAll, create };
