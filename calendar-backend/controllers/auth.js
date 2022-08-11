const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('./../models/Usuario');


const createUser = async (req, res = response) => {

  //Creamos el usuario - req.body;
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if ( usuario ) {
      return res.status(400).json({
        ok: false,
        mng: 'Un usuario ya existe con ese correo'
      });
    }

    usuario = new Usuario( req.body );

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
  });

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Por favor hable con el administrador'
    })
  }
};



const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        mng: 'El usuario no existe con ese correo'
      });
    }

    //Confirmar los passwords

    const validPassword = bcrypt.compareSync( password, usuario.password);

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    //Generar nuestrp JWT

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
    })

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Por favor hable con el administrador'
    })
  }

};




const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
