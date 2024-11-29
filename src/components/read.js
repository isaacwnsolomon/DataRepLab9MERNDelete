import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [movies, setMovies] = useState([]);

  const reloadData = ()=>{
    axios.get('http://localhost:4000/api/movies')
    .then((response) => {
      console.log(response.data);
      setMovies(response.data.movies);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    
    axios.get('http://localhost:4000/api/movies')
      reloadData();
  },[]);

  return (
    <div>
      <h3>Hello from read component!</h3>
      <Movies myMovies={movies} ReloadData={reloadData} />
    </div>
  );
}

export default Read;