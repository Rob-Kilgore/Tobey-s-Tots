jQuery.ajaxSetup({async:false});

function showPopularMovies(){
  const $carousel=$("figure");

  $carousel.empty();
  let topMovies = new Array();

  $.get("/api/movie", function( data ){
    topMovies = data;
  });

  for(var i = 0; i < topMovies.length; i++){
    let path = "https://image.tmdb.org/t/p/w1280"+topMovies[i].poster_path;
    let movieId = topMovies[i].id;
    $carousel.append('<img onclick="location.href = \'./movie.html\';" src="'+path+'" id = "cposter1" alt="" class="'+movieId+'">');
  }

}

function showTopMoviesByCategory(){
  const $topActing = $("#topActing");
  const $topMusic = $("#topMusic");
  const $topStory = $("#topStory");

  $topActing.empty();
  $topMusic.empty();
  $topStory.empty();

  let acting = new Array();
  $.get("/api/movie/topMovies/6", function( data ){
    acting = data;
  });
  for(var i=0; i<acting.length; i++){
    $topActing.append('<li> <a href="./movie.html">'+acting[i].title+'</a></li>');
  }

  let music = new Array();
  $.get("/api/movie/topMovies/0", function( data ){
    music = data;
  });
  for(var i=0; i<music.length; i++){
    $topMusic.append('<li> <a href="./movie.html">'+music[i].title+'</a></li>');
  }

  let story = new Array();
  $.get("/api/movie/topMovies/5", function( data ){
    story = data;
  });
  for(var i=0; i<story.length; i++){
    $topStory.append('<li> <a href="./movie.html">'+story[i].title+'</a></li>');
  }


}

$(() => {
  showPopularMovies();
  showTopMoviesByCategory();
});
