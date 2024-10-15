const knex = require("../db/connection")

function list(){
    return knex("theaters")
        .select("*")
        .then((theaters) => {
            theaterPromises = theaters.map((theater) => {
                return knex("movies as m")
                    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                    .select("*")
                    .where({"mt.theater_id": theater.theater_id})
                    .then((movies) => {
                        return {...theater, movies};
                    })
            })

            return Promise.all(theaterPromises);
        });
}

module.exports = {
    list
}