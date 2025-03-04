const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../model/adminModel');

passport.use(new LocalStrategy({usernameField: 'email'},async (email, password, done) => {
    const admin =  await model.findOne({email: email});
    
    if(admin) {
        if(password == admin.password){
            return done(null, admin);
        }
        else{
            return done(null, false, {message: 'Incorrect password.'});
        }
    }
    else {
        return done(null, false, {message: 'Incorrect email.'});
    }
}));


passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    const admin = await model.findById(id);
    done(null, admin);
});

passport.checkAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
    res.redirect('/');
    }
};

passport.AuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;