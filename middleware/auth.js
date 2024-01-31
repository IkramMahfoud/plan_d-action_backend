const expressJWT = require("express-jwt");
require("dotenv").config();

/*
1-Création du Middleware
 Déclarez une fonction middleware appelée requireSignIn qui utilise expressJWT
  // Le middleware a vérifié l'authentification avec succès
    // L'objet req maintenant contient les informations d'authentification sous req.auth
    // Vous pouvez accéder aux informations d'authentification comme req.auth._id, req.auth.role, etc.
*/
exports.isAuth = (req, res, next) => {
   // Vérification du rôle de l'utilisateur
   //Si le rôle de l'utilisateur (extraire du token JWT via req.auth.role) est égal à 1, cela signifie qu'il a le rôle requis )
   //Vérification du propriétaire du profil
   //On vérifie si req.profile (qui pourrait être les données du profil de l'utilisateur) et req.auth (qui pourrait être les informations d'authentification extraites du token JWT) existent, et si l'ID du profil correspond à l'ID extrait du token.
   // Cela pourrait indiquer que l'utilisateur est le propriétaire du profil.
   //Si l'utilisateur n'a pas le rôle requis et n'est pas le propriétaire du profil, le middleware renvoie une réponse JSON avec un statut 403 (Access Denied) indiquant un accès refusé.
   //Autorisation de l'accès
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role == 0) {
    res.status(403).json({
      error: "Admin Resource ,access denied !!!!!",
    });
  }
  next();
};