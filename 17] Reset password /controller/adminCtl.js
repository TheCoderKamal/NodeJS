const model = require("../model/adminModel");
const fs = require("fs");
const mailer = require("../middleware/mailer");


module.exports.login = (req, res) => {
    res.render("adminLogin");
};

module.exports.adminLogin = async (req, res) => {
    await model.findOne({email : req.body.email}).then((data) => {
        if(data.email == req.body.email && data.password == req.body.password){
            res.redirect("/dashboard");
        }
        else{
            res.redirect("/");
        }
    });
};

module.exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.adminProfile = async(req, res) => {
    res.render("adminProfile");
};

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
};

module.exports.adminForm = (req, res) => {
    res.render("adminForm");
};

module.exports.addAdmin = async(req, res) => {
    req.body.image = req.file.path;
    await model.create(req.body).then(() => {
        res.redirect("/adminForm");
    })
};

module.exports.adminTable = async(req, res) => {
    await model.find({}).then((data) => {
        res.render("adminTable", {data});
    });
};

module.exports.deleteAdmin = async(req, res) => {
    const adminImage = await model.findById(req.params.id);
    fs.unlinkSync(adminImage.image);
    await model.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/adminTable");
    });
};

module.exports.editAdmin = async(req, res) => {
    await model.findById(req.params.id).then((data) => {
        res.render("adminUpdate", {data});
    });
};

module.exports.updateAdmin = async(req, res) => {
    const admin = await model.findById(req.body.id);
    let image;
    req.file ? image = req.file.path : image = admin.image;
    fs.unlinkSync(admin.image);
    await model.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/adminTable");
    })
};

module.exports.changePassword = (req, res) => {
    res.render("changePassword");
}; 

module.exports.updatePassword = async(req, res) => {
    // console.log(req.user);
    // console.log(req.body);

    const admin = req.user;

    if(admin.password == req.body.oldPassword){
        if(req.body.newPassword != admin.Password){
            if(req.body.newPassword == req.body.confirmPassword){
                await model.findByIdAndUpdate(admin._id, {password : req.body.newPassword}).then(() => {
                    res.redirect("/");
                });
            }
            else{
                res.redirect("/changePassword");
            }
        }
        else{
            res.redirect("/changePassword");
        }
    }
    else{
        res.redirect("/changePassword");
    }
};

module.exports.changeForgotPassword = async(req, res) => {
    let admin = await model.findOne({email : req.body.email});

    if(!admin){
        return res.redirect("/changeForgotPassword");
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.admin = admin;

    res.redirect("/changeForgotPasswordPage");
};

module.exports.changeForgotPasswordPage = (req, res) => {
    res.render("changeForgotPassword");
}

module.exports.changeOtpPassword = async(req, res) => {
    let admin = req.session.admin;
    let otp = req.session.otp;

    if(otp == req.body.otp){
        await
        model.findByIdAndUpdate(admin._id, {password : req.body.newPassword}).then(() => {
            res.redirect("/");
        });
    }
    else{
        res.redirect("/changeForgotPasswordPage");
    }
};