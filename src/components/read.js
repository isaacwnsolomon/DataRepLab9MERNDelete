import Movies from "./movies"; // Importing movies component
import { useEffect, useState } from "react";// Importing react hooks
import axios from "axios"; // Importing axios for http requests

// Define read component
const Read = () => {
//State variable movies to store movie data and setMovies function to update
  const [movies, setMovies] = useState([]);

  //Fetch data from api and update movies state
  const reloadData = ()=>{
    // Make get request
    axios.get('http://localhost:4000/api/movies')
    .then((response) => {
      // log response to console
      console.log(response.data);
      // Update state with fetch movie data
      setMovies(response.data.movies);
    })
    .catch((error) => {
      // Log errors to console
      console.log(error);
    });
  }
  useEffect(() => {
    
    axios.get('http://localhost:4000/api/movies')
    // Call reloadData to detch and set movie data
      reloadData();
  },[]);

  // Render component
  return (
    <div>
      <h3>Hello from read component!</h3>
      <Movies myMovies={movies} ReloadData={reloadData} />
    </div>
  );
}
// export read component
export default Read;