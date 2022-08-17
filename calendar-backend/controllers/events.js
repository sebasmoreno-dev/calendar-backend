const { response } = require("express");
const Evento = require('../models/Evento');


const getEventos = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'getEventos',
  });

}

const createEvent = async ( req, res = response) => {

  //verificar que tenga el evento - nueva instancia del modelo
  const evento = new Evento( req.body );

  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save()

    res.json({
    ok: true,
    evento: eventoGuardado
  });

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg: 'Por favor hable con el administrador'
    })
  }

}

const updateEvento = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'updateEvento',
  });
}

const deleteEvento = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'deleteEvento',
  });
}


module.exports = {
  getEventos,
  createEvent,
  updateEvento,
  deleteEvento,
}