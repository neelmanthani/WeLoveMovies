const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

async function list(req, res, next) {
    const { is_showing } = req.query;
    const data = await moviesService.list(is_showing === "true");
    res.json({data});
}

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movie = await moviesService.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({status: 404, message: "Movie cannot be found."})
}

async function read(req, res, next) {
    const movie = res.locals.movie;
    res.json({data: movie});
}

async function listReviewsByMovie(req, res, next) {
    const movieId = res.locals.movie.movie_id;
    const data = await moviesService.listReviewsByMovie(movieId);
    res.json({data});
}

async function listTheatersByMovies(req, res, next){
    const movieId = res.locals.movie.movie_id;
    const data = await moviesService.listTheatersByMovie(movieId);
    res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listReviewsByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsByMovie)],
    listTheatersByMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersByMovies)]
}