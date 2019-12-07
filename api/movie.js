const router = require("express").Router();
const dbInterface = require('./dbInterface');

// Add redirects to html files.
router.get('/', (req, res) => {
  var movies = [];
  dbInterface.getPopularMovies('a05a8eaa14c959a0ea671b72e74db2a1', (body) => {
       for (var i=0; i < body.length; i++){
         movies.push(body[i]);
       }
  });
  console.log(movies);
  res.json(movies);
});

//page for specific movie
router.get('/movies/:movieId', function(req, res){
  let movieId = req.params.movieId;
  let movie = dbInterface.getMovieByID();
  if(movie === -1){
    movie = dbInterface.getOMDBObjectById();
  }
  res.json(movie);
})

router.get('/search/:movieTitle', function(req, res){
  let movieTitle = req.params.movieTitle;
  let movie = dbInterface.getMovieByTitle();
  if(movie === -1){
    movie = dbInterface.getOMDBObjectByTitle();
  }
  res.json(movie);
})

router.post('/movies/:movieId/review', function(req, res){
  let movieId = req.params.movieId;
  let review = req.body;
  let userId = review.userId;
  let scores = review.scores;
  let text = review.text;
  dbInterface.addReview(movieId, userId, scores, text);
  res.status(201).json(movieId);
})

module.exports = router;