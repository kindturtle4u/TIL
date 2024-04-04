import styles from "../styles/movie-videos.module.css"
const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getVideos(id: string) {
    console.log(`Fetching videos: ${Date.now()}`);
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${API_URL}/${id}/videos`)
    return response.json();
}

export default async function MovieVideos({id}: { id: string }) {
    const videos = await getVideos(id);
    return (
        <div className={styles.container}>
            {videos.map(video => (
                <iframe key={video.key}
                        src={`https://youtube.com/embed/${video.key}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.name}
                />
            ))}
        </div>
    )
}
