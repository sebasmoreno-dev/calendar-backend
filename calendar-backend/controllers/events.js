const { response } = require("express");
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

  //*Retornar la lista de todos los eventos
  const eventos = await Evento.find()
                              .populate('user', 'name');

  res.json({
    ok: true,
    eventos
  });

}

const createEvent = async ( req, res = response) => {

  //*verificar que tenga el evento - nueva instancia del modelo
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

const updateEvento = async ( req, res = response) => {

  //*Tomar el valor del id del evento
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //*Verificar que exista en la base de datos
    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }

    //*Verificar que la persona que creo el evento sea la misma que lo quiera actualizar
    if ( evento.user.toString() !== uid ) {
      res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    //*Puede editar el evento
    //*Evento actualizado
    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    //*Actualizar evento
    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} );

    res.json({
      ok: true,
      evento: eventoActualizado
    });


  } catch (error) {
      console.log(error);
      res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

const deleteEvento = async ( req, res = response) => {

  //*Tomar el valor del id del evento
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //*Verificar que exista en la base de datos
    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }

    //*Verificar que la persona que creo el evento sea la misma que lo quiera actualizar
    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      });
    }

    //*Eliminar evento
    const eventoEliminado = await Evento.findByIdAndDelete( eventoId, { new: true} );

    res.json({
      ok: true,
      evento: eventoEliminado
    });


  } catch (error) {
      console.log(error);
      res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}


module.exports = {
  getEventos,
  createEvent,
  updateEvento,
  deleteEvento,
}