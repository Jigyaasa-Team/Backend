const auth = require('./auth');
const { loginRateLimiter, feedbackRequestsLimiter } = require('./limiter');

module.exports = {
    auth,
    loginRateLimiter,
    feedbackRequestsLimiter
}