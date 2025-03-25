const adminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');

module.exports.registerAdmin = async(req, res) => {
    let admin = await adminModel.findOne({email: req.body.email});

    if (admin) {
        return res.status(400).json({message: 'Email already exists'});
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await adminModel.create(req.body).then(() => {
        res.json({message: 'Admin registered successfully'});
    });
};

module.exports.loginAdmin = async(req, res) => {
    let admin = await adminModel.findOne({email: req.body.email});

    if (!admin) {
        return res.status(400).json({message: 'Email or password is incorrect'});
    }

    let isMatch = await bcrypt.compare(req.body.password, admin.password);

    if (isMatch) {
        let token = jwt.sign({ admin }, "rnw", { expiresIn: "1h" });
        return res.json({message: 'Admin logged in successfully', token: token});
    }
    
    res.status(400).json({message: 'Email or password is incorrect'});  
};

module.exports.viewAdmin = async(req, res) => {
    await adminModel.find({}).then((data) => {
        res.status(200).json({record : data});
    })
};

module.exports.changePassword = async(req, res) => {
    let admin = req.admin.admin;

    let isMatch = await bcrypt.compare(req.body.oldPassword, admin.password);

    let newPass = await bcrypt.hash(req.body.newPassword, 10);

    if (!isMatch) {
        return res.status(400).json({message: 'Old password is incorrect'});
    }else{
        if(req.body.newPassword != req.body.confirmPassword){
            return res.status(400).json({message: 'new password and confirm password does not match'});
        }
        else{
            await adminModel.findByIdAndUpdate(admin._id, {password: newPass}).then(() => {
                res.json({message: 'Password changed successfully'});
            })
        }
    }
}

module.exports.OTPInMail = async(req, res) => {
    let admin = await adminModel.findOne({email: req.body.email});

    if (!admin) {
        return res.status(400).json({message: 'Email not found'});
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.admin = admin;

    res.status(200).json({message: 'OTP sent successfully'});
};

module.exports.verifyOTP = async (req, res) => {
    try {
        let otp = String(req.session.otp);
        let admin = req.session.admin;

        console.log(otp, admin);
        console.log(req.body);

        if (otp !== req.body.otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        await adminModel.findByIdAndUpdate(admin._id, { password: hashedPassword });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};