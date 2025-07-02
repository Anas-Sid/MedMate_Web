

const Availability = require('../models/Availability');


exports.getAvailability = async (req, res) => {
  try {
    const { doctorId } = req.query;

    if (!doctorId) {
      return res.status(400).json({ message: 'doctorId is required' });
    }

    const availability = await Availability.find({ doctorId }).sort({ date: 1 });
    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createAvailability = async (req, res) => {
  try {
    const { doctorId, date, fromTime, toTime, appointmentDuration } = req.body;

    const availability = new Availability({
      doctorId,
      date,
      fromTime,
      toTime,
      appointmentDuration,
    });

    await availability.save();
    res.status(201).json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateAvailability = async (req, res) => {
  try {
    const availability = await Availability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteAvailability = async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id);
    res.json({ message: 'Availability deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
