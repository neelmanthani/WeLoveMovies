const knex = require("../db/connection")
// const mapProperties = require("../utils/map-properties")

function list(is_showing) {
    if (is_showing) {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select("m.*")
            .where("mt.is_showing", true)
            .groupBy('m.movie_id');
    }
    return knex("movies")
        .select("*");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first();
}

function listReviewsByMovie(movieId){
    return knex("reviews")
        .select("*")
        .where({movie_id: movieId})
        .then((reviews) => {
            reviewPromises = reviews.map((review) => {
                return knex("critics")
                    .select("*")
                    .where({critic_id: review.critic_id})
                    .first()
                    .then((critic) => {
                        return {...review, critic}
                })
            })

            return Promise.all(reviewPromises);
        })
}

function listTheatersByMovie(movieId){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("*")
        .where({"mt.movie_id": movieId, "mt.is_showing": true})

}

module.exports = {
    list,
    read,
    listReviewsByMovie,
    listTheatersByMovie
}