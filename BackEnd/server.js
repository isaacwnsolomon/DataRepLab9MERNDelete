// Imorting required modules
// Framework for creating webservers
const express = require('express');
// Instance of express
const app = express();
// Port server listens on 
const port = 4000;
// Importing cross origin sharing
const cors = require('cors');
app.use(cors());

// FUnction to set custom headers for cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//bodyParser to handle incoming requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//IMporting mongoose to interact MongoDB
const mongoose = require('mongoose');
// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://admin:admin@admin.z44it.mongodb.net/myMovieDB');

// Define the schema for a movie document
const movieSchema = new mongoose.Schema({
  title:String,
  year:String,
  poster:String
});

// Create a model based on the movie schema
const movieModel = new mongoose.model('myMovies',movieSchema);

// Route to fetch all movies
app.get('/api/movies', async (req, res) => {
  // Get all movies from database
    const movies = await movieModel.find({});
   //Returns movies as JSON data
    res.status(200).json({movies})
});

// Route to fetch movies based on ID
app.get('/api/movie/:id', async (req ,res)=>{
  // Finds movie on ID
  const movie = await movieModel.findById(req.params.id);
 // Returns movie in JSON
  res.json(movie);
})

// Update movie by ID
app.put('/api/movie/:id', async (req,res)=>{
  // Update movie and return updated docuemnt
  let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  // Returns updated movie
  res.send(movie);
})

// Delete to handle movie deletion by id
app.delete('/api/movie/:id', async (req, res) => {
  // Log ID of movie being deleted
  console.log('Deleting movie with ID:', req.params.id);
  // Finds movie by ID and deletes from database
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  // Send response with a success message and deleted movie data
  res.status(200).send({ message: "Movie deleted successfully", movie });
  
});

// Route to add a new movie
app.post('/api/movies',async (req, res)=>{
    console.log(req.body.title);
    const {title, year, poster} = req.body;
// Creates new movie document
    const newMovie = new movieModel({title, year, poster});
   // Saves it in database
    await newMovie.save();

    res.status(201).json({"message":"Movie Added!",Movie:newMovie});
})

// Start server and listen on specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// {
//   "Title": "Avengers: Infinity War (server)",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// },
// {
//   "Title": "Captain America: Civil War (server)",
//   "Year": "2016",
//   "imdbID": "tt3498820",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
// },
// {
//   "Title": "World War Z (server)",
//   "Year": "2013",
//   "imdbID": "tt0816711",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// }