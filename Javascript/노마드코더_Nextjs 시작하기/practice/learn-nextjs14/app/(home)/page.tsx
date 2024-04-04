import Link from "next/link";
import Movie from "../../components/movie";
import styles from "../../styles/home.module.css"

const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
const getMovies = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("fetching")
    const response = await fetch(API_URL);
    return await response.json();
}

export default async function HomePage() {
    const movies = await getMovies();
    return (
        <div className={styles.container}>
            {movies.map(movie =>
                <Movie key={movie.id} title={movie.title} id={movie.id} poster_path={movie.poster_path} />
            )}
        </div>
    )
};
