const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.signin', new LocalStrategy({
    usernameField:          'Username',
    passwordField:          'Password',
    passReqToCallback:      true
}, async (req, Username, Password, done) => {
    const rows = await pool.query('SELECT * FROM Users WHERE Username = ?', [Username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validpassword = await helpers.matchPassword(Password, user.Password)
        if (validpassword) {
            const result2 = await pool.query('SELECT * FROM Personas WHERE CIE = ?', [Username]);
            user.Nombres = result2[0].Nombres;
            user.Apellidos = result2[0].Apellidos;
            done(null, user, req.flash('success', 'Bienvenido '+ user.Nombres+' '+user.Apellidos));
        } else {
            done(null, null, req.flash('message', 'Contraseña incorrecta'));
        }
    }else{
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField:          'Username',
    passwordField:          'Password',
    passReqToCallback:      true
}, async (req, Username, Password, done) => {
    const newUser = {
        Password
    };
    const User = {
        Username
    };
    newUser.Password = await helpers.encryptPassword(Password);

    const result = await pool.query('UPDATE Users set ? where Username = ?', [newUser, User.Username]);
    done(null, User);
}));

passport.serializeUser((user, done) => {
    done(null, user.Username);
});
  
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM Users WHERE Username = ?', [id]);
    const result2 = await pool.query('SELECT * FROM Personas WHERE CIE = ?', [id]);
    rows[0].Nombres = result2[0].Nombres;
    rows[0].Apellidos = result2[0].Apellidos;
    rows[0].Tipo = result2[0].Tipo;
    done(null, rows[0]);
});