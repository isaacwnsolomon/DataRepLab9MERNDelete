// Importing required modules and hooks
// Axios used for making HTTP requests
import axios from "axios";
// manages component state
import { useState } from "react";

// Defining create component
const Create = () => {

    // State for movie title 
    const [title, setTitle] = useState('');
   // State for movie year
    const [year, setYear] = useState('');
    // State for movie poster 
    const [poster, setPoster] = useState('');

    // Function to handle form submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create movie object 
        const movie = {title,year,poster};
       // Logging movie object to console 
        console.log(movie);

        // Send a post request to backend to save the movie 
        axios.post('http://localhost:4000/api/movies',movie)
       // Log servers repsonse
        .then((res)=>{console.log(res.data)})
        .catch();
    }

    return (
        <div>
            <h3>Hello from create component!</h3>
         {/* Form for adding a new movie */}
            <form onSubmit={handleSubmit}>
              
                {/* Input field for the movie title */}
               <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                     {/* Input field for the movie year */}
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control"
                        value={year}
                        onChange={(e) => { setYear(e.target.value) }}
                    />
                </div>
                {/* Input field for the movie poster URL */}
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control"
                        value={poster}
                        onChange={(e) => { setPoster(e.target.value) }}
                    />
                </div>
                <div>
                     {/* Submit button */}
                    <input type="submit" value="Add Movie"></input>
                </div>
            </form>
        </div>
    );
}
// Export create component
export default Create;