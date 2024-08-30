import axios from "axios";
import { Song } from "./SongTypes";

axios.defaults.baseURL = "http://localhost:5000/api/songs";

export const getSongsAPI = async () => axios.get("/");

export const getSongByIdAPI = async (id: string) => axios.get(`/${id}`);

export const createSongAPI = async (song: any) => axios.post(`/create`, song);

export const updateSongAPI = async (id: string, updatedSong: Song) =>
  axios.put(`/${id}`, updatedSong);

export const deleteSongAPI = async (id: string) => axios.delete(`/${id}`);

export const getStats = async () => axios.get("/stats");
