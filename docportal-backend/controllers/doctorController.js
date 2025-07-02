const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signupDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNumber, pmdcNumber, specialization, dob } = req.body;

    
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      pmdcNumber,
      specialization,
      dob,
    });

    await doctor.save();

   
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      doctor: {
        id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        contactNumber: doctor.contactNumber,
        pmdcNumber: doctor.pmdcNumber,
        specialization: doctor.specialization,
        dob: doctor.dob,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      doctor: {
        id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        contactNumber: doctor.contactNumber,
        pmdcNumber: doctor.pmdcNumber,
        profilePicture: doctor.profilePicture,
        specialization: doctor.specialization,
        dob: doctor.dob,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password'); // exclude passwords
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

