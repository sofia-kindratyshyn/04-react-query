import axios from "axios"
import type { Movie } from "../types/movie";
interface MovieResponse {
  results: Movie[]
  total_pages: number
}

export const fetchQuery = async (value: string, page: number): Promise<MovieResponse> => {
    const responce = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&page=${page}`,
    {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }}
  )
  return responce.data;
  
}