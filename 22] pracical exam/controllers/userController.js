const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registration = async (req, res) => {
    const user = req.body;

    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    user.avatar == "" ? user.avatar = "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid" : user.avatar = req.file.path;

    if(user.password != user.confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await userModel.create({...user, password: hashedPassword, role: 'user' });
    res.status(201).json({ message: 'User registered successfully' });
}

module.exports.login = async (req, res) => {
    const user = req.body;
    const existingUser = await userModel.findOne({ email: user.email });

    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(user.password, existingUser.password);

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, 'user', { expiresIn: '1h' });

    // res.cookie("authToken", token, { httpOnly: true });
    res.json({ token });
};