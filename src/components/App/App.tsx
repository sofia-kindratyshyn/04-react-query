import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal"
import SearchBar from "../SearchBar/SearchBar"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Loader from "../Loader/Loader"
import { useEffect, useState } from "react"
import MovieGrid from "../MovieGrid/MovieGrid"
import toast, { Toaster } from "react-hot-toast"
import type { Movie } from "../../types/movie"
import { fetchQuery } from "../../services/movieService"
import ReactPaginate from 'react-paginate';
import css from "./App.module.css"


type MovieObj = Movie | null


interface MovieResponse {
  results: Movie[]
  total_pages: number
}


export default function App(){
    const [searchValue, setSearchValue] = useState("")
    const [selectedMovie, setSelectedMovie] = useState<MovieObj>(null)
    const [currentPage, setCurrentPage] = useState(1)
    
    const {data, isError, isLoading, isSuccess} = useQuery<MovieResponse>({
        queryKey: ["myQueryKey", searchValue, currentPage],
        queryFn:() => fetchQuery(searchValue, currentPage),
        enabled: !!searchValue,
        placeholderData: keepPreviousData
    })
    
    function handleGet(value: string): void {
        setSearchValue(value);
        setCurrentPage(1)
    }

    useEffect(()=>
        {if(isSuccess && data?.results.length === 0){
            toast.error("No movies found for your request.")}
        },[data, isSuccess]);

        function openModal(movie: Movie) {
            setSelectedMovie(movie)
        }

        function closeModal() {
          setSelectedMovie(null)}
    
    return(
        <>
        <Toaster/>
        <SearchBar onSubmit={handleGet}/>
        {isError && <ErrorMessage/>}
        {isLoading && <Loader/>}
        {isSuccess && data?.results && <MovieGrid onSelect={openModal} movies={data.results}/> }
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
        {typeof data?.total_pages === 'number' && data?.total_pages > 1 && !(isError) &&<ReactPaginate 
        pageCount={(data?.total_pages)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
         />}
        </>
    )
        }
