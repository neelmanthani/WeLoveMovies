const knex = require("../db/connection");

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .first();
}

function destroy(reviewId){
    return knex("reviews")
        .where({review_id: reviewId})
        .del();
}

function update(updatedReview){
    return knex("reviews")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview);
}

function getCriticFromReview(criticId){
    return knex("critics")
        .select("*")
        .where({critic_id: criticId})
        .first();
}

module.exports = {
    read,
    destroy,
    update,
    getCriticFromReview
}