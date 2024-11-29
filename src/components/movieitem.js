
import { useEffect } from "react"; // Importing useEffect for side effects
import Card from 'react-bootstrap/Card';//Imort card from react-boostrap
import { Link } from "react-router-dom"; // Link for navigtion
import Button from "react-bootstrap/Button";// Button from bootstrap
import axios from "axios"; // Axios for http requests

//Define MovieItem component which takes props as an argument
const MovieItem = (props)=> {
  // Log current movie when it changes
  useEffect(() => {
    // Log movie details to console
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  // Function to handle deletion of a movie
  const handleDelete = (e)=>{
    // Prevents default form submission behaviour
    e.preventDefault();
    // Send a delete request to server using axios
    axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
    .then((res)=>{
      // Calls reload functin passed from parent 
      props.Reload();
    })
    .catch((err) =>{
      // Log errors
      console.log(err)
    });
  }
  // render movie details in card component
  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        {/* Link to edit the movie, navigating to the edit route */}
        <Link className = "btn btn-primary" to={"/edit/" +props.mymovie._id}>Edit</Link>
         {/* Button to delete the movie */}
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}
// Export MovieItem
export default MovieItem;