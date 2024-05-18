const passport = require("passport");
const jwt = require("passport-jwt");
const GitHubStrategy = require("passport-github2");
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const UserModel = require("../dao/models/user.model.js");

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // Utiliza ExtractJwt.fromExtractors para extraer el token de la cookie
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            // Busca el usuario en la base de datos usando el ID del payload JWT
            const user = await UserModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user); // Devuelve el usuario encontrado
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia para GitHub
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.ac897018476700ab",
        clientSecret: "9e79f10996f38757cd26f76539b4c86c1b0ddada",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Profile: ", profile);
        try {
            let user = await UserModel.findOne({ email: profile._json.email })

            //Generador de edad random entre 18 y 60 años
            function getRandomAge() {
                const randomNumber = Math.random();
                const ageRange = 60 - 18 + 1;
                const randomAgeInRange = Math.floor(randomNumber * ageRange);
                const finalAge = 18 + randomAgeInRange;
                return finalAge;
            }            
            const edadAleatoria = getRandomAge();

            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: edadAleatoria,
                    email: profile._json.email,
                    password: ""
                }
                let result = await UserModel.create(newUser);
                done(null, result)
            } else {
                done(null, user);
            }

        } catch (error) {
            return done(error);
        }

    }));
}

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]
    }
    return token;
}

module.exports = initializePassport;