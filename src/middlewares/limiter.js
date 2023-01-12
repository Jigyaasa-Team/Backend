const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min in milliseconds
  max: 6,
  message: 'Login error, you have reached maximum retries. Please try again after 10 minutes', 
  statusCode: 429,
  headers: true,
});

const feedbackRequestsLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 2,
  message: 'You have submitted maximum amount of feedbacks. Please try again after 24 hours', 
  statusCode: 429,
//   headers: true,
});

module.exports = { loginRateLimiter, feedbackRequestsLimiter }