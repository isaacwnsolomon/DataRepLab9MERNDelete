// Importing MovieItem 
import MovieItem from "./movieitem";

//Define movies component which receives prop as an argument
const Movies = (props)=>{
    // using map method to iterate of myMovies
    return props.myMovies.map(

        (movie)=>{
            // Render MovieItem component for each movie object
            return <MovieItem mymovie={movie} key={movie._id} Reload={props.ReloadData}/>
        }
    );
}
// Export Movies
export default Movies;