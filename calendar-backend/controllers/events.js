const { response } = require("express");


const getEventos = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'getEventos',
  });

}

const createEvent = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'createEvent',
  });

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