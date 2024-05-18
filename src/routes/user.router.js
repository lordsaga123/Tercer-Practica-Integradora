
const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");

const userController = new UserController();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin.bind(userController));

//Alternativa Creación de Rutas Tercer Práctica Integradora
router.post("/requestPasswordReset", userController.requestPasswordReset.bind(userController)); // Nueva ruta
router.post("/reset-password", userController.resetPassword.bind(userController));
router.put("/premium/:uid", passport.authenticate("jwt", { session: false }), userController.changeRolPremium.bind(userController));
/*

//Tercer Práctica Integradora: 
router.post("/requestPasswordReset", userController.requestPasswordReset); // Nueva ruta
router.post('/reset-password', userController.resetPassword);
router.put("/premium/:uid", userController.changeRolPremium);*/


module.exports = router;



/*const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const { createHash } = require("../utils/hashBcrypt.js");
const passport = require("passport");




//Post para generar un usuario con PASSPORT

router.post("/", passport.authenticate("register", {
    failureRedirect: "/failedregister"
}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    req.session.login = true;

    res.redirect("/profile");
})

router.get("/failedregister", (req, res) => {
    res.send({error: "Registro fallido"});
})

module.exports = router; */