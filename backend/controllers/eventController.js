const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity } = req.body;

        let image = '';
        if (req.file) {
            image = req.file.path; // or req.file.filename if you prefer just the name
        }

        const event = new Event({
            title, description, date, location, capacity, image,
            createdBy: req.user.id
        });

        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'username');
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'username');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.rsvpEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        const eventCheck = await Event.findById(eventId);
        if (!eventCheck) return res.status(404).json({ message: 'Event not found' });

        if (eventCheck.attendees.includes(userId)) {
            // leave event
            const event = await Event.findByIdAndUpdate(
                eventId,
                { $pull: { attendees: userId } },
                { new: true }
            );
            return res.json(event);
        } else {
            // join event
            const event = await Event.findOneAndUpdate(
                {
                    _id: eventId,
                    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
                },
                { $push: { attendees: userId } },
                { new: true }
            );

            if (!event) {
                const fullCheck = await Event.findById(eventId);
                if (fullCheck && fullCheck.attendees.length >= fullCheck.capacity) {
                    return res.status(400).json({ message: 'Event is full' });
                }
                return res.status(400).json({ message: 'RSVP failed' });
            }
            return res.json(event);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
