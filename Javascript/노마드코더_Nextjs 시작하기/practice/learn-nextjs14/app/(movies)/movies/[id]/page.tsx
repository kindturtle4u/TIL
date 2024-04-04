import MovieVideos from "../../../../components/movie-videos";
import MovieInfo, {getMovie} from "../../../../components/movie-info";
import {Suspense} from "react";

const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

interface IParams {
    params: { id: string }
}

export async function generateMetadata({params: {id}}: IParams) {
    const movie = await getMovie(id);
    return {
        title: movie.title,
    }
}

export default function MovieDetail({params: {id}}: IParams) {
    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id}/>
            </Suspense>
            <Suspense fallback={<h1>Loading movie videos</h1>}>
                <MovieVideos id={id}/>
            </Suspense>
        </div>
    )
}
