import axios from "axios"

export const fetchQuery = async (value: string, page: number) => {
    const responce = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&page=${page}`,
    {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }}
  )
  return responce.data;
  
}