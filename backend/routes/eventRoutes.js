const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

// Protected routes
router.post('/', auth, upload.single('image'), eventController.createEvent);
router.post('/:id/rsvp', auth, eventController.rsvpEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;
