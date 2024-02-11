const expressJWT = require("express-jwt");
require("dotenv").config();


exports.requireSignIn = expressJWT({
    // Configure expressJWT with your JWT secret
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    // Le middleware a vérifié l'authentification avec succès
    userProperty: "auth"
});


exports.isAuth = (req, res, next) => {
   // Vérification du rôle de l'utilisateur
   if (req.auth.role !== 1) {
       return res.status(403).json({ error: 'authrole Denied' });
   }

   // Vérification du propriétaire du profil
   if (req.profile && req.auth && req.profile._id != req.auth._id) {
       return res.status(403).json({ error: 'req Denied' });
   }

   // Si l'utilisateur a le rôle requis ou est le propriétaire du profil, continuer
   next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role === 0) {
    res.status(403).json({
      error: "Admin Resource, access denied!",
    });
  } else {
    next();
  }
};
