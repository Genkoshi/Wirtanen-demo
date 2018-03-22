require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , massive = require('massive')
    , Auth0Strategy = require('passport-auth0')
    , saves_ctrl = require('./controllers/savesController.js')
    , path = require('path');

const {
    SERVER_PORT,
    SERVER_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    REACT_APP_LOGIN,
    HOMEPAGE,
    START_MENU
} = process.env;

const app = express();

app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([profile.id]).then(user => {
        if (!user[0]) {
            db.create_user([profile.displayName, profile.id])
                .then(res => {
                    done(null, res[0].id);
                })
        }else {
            done(null, user[0].id)
        }
    })
}))
passport.serializeUser((id, done) => {
    done(null, id);
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id])
    .then(user => {
        done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: START_MENU,
    failureRedirect: REACT_APP_LOGIN
}))
app.get('/auth/me', (req, res) => {
    if (req.user){
        res.status(200).send(req.user);
        }else {
            res.redirect(HOMEPAGE)
        }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(HOMEPAGE);
})

app.get('/api/saves/:id', saves_ctrl.getAll )
app.get('/api/mostRecentSave/:id', saves_ctrl.getNewest)
app.put('/api/updateSave/:saveID/:userID', saves_ctrl.update )
app.post('/api/save/:id', saves_ctrl.create )
app.delete('/api/deleteSave/:id', saves_ctrl.delete )

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, console.log(`IT\'S OVER ${SERVER_PORT}!!!!!`));