const reviewsService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function reviewExists(req, res, next){
    const reviewId = req.params.reviewId;
    const review = await reviewsService.read(reviewId);
    if (review){
        res.locals.review = review;
        return next();
    }
    return next({status: 404, message: "Review cannot be found."})
}

async function destroy(req, res, next){
    const reviewId = req.params.reviewId;
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
}

async function update(req, res, next){
    const updatedReview = {
        ...res.locals.review,
        ...(req.body.data || {}),
        review_id: res.locals.review.review_id,
      };

    await reviewsService.update(updatedReview);

    const critic = await reviewsService.getCriticFromReview(updatedReview.critic_id);
    
    res.json({data: {
        ...updatedReview,
        critic
    }});
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}