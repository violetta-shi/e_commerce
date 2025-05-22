const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analytics.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Track user events (public endpoint)
router.post('/track', analyticsController.trackEvent);

// Get analytics data (admin only)
router.get('/', authenticateToken, analyticsController.getAnalytics);

module.exports = router; 