
import React from 'react';// Import react
import { useParams } from 'react-router-dom';// Import useParams to access route parameters
import { useState, useEffect } from 'react';// Import useState and useEffect hooks
import axios from 'axios';// Import axios for HTTP requests
import { useNavigate } from "react-router-dom";// Import useNavigate for navigation

// define edit component
export default function Edit(props) {
//Etract id paramater from url
  const { id } = useParams();
  // State variables to hold movie details
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  // Intiialise navgiate function 
  const navigate = useNavigate();
  // useEffect to fetch movie data 
useEffect(() => {
    // Fetch by id
    axios.get('http://localhost:4000/api/movie/' + id)
        .then((response) => {
            // Set title year and poster state
            setTitle(response.data.title);
            setYear(response.data.year);
            setPoster(response.data.poster);
        })
        .catch((error) => {
            // Log any errors
            console.log(error);
        });
    // Dependency array ensures this runs when 'id' changes
}, [id]);

 // Function to handle form submission
const handleSubmit = (event) => {
    // Prevent default form submission behaviour
    event.preventDefault();
    // Create a new movie object with updated details
    const newMovie = { id, title, year, poster };
    // Send PUT request to update the movie
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
        .then((res) => {
            // log response data
            console.log(res.data);
            // Redirect to read page
            navigate('/read');
        });
}
//render form for editing movie
return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Movie Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Release Year: </label>
                <input type="text" 
                className="form-control" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Poster URL: </label>
                <input type="text" 
                className="form-control" 
                value={poster} 
                onChange={(e) => setPoster(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="submit" value="Edit Movie" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}