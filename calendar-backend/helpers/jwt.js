const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el Token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};

//Estoy regresando una nueva promesa
/*
  el payload es el uid y el nombre
  que mandamos a guardar como payload
  luego hacemos la firma del token
  que tiene el payload que es este objeto { uid, name };
  process.env,SECRET_JWT_SEED - es la palabra secreta que vamos a usar
  luego especificamos la duracion
  y cuando se firma, vamos a llamar el callback en el cual
  voy a tener un error si por alguna razon no se pudo generar el token y lo imprimo en consola
  y si todo lo hace bien voy a tener el token

 */
