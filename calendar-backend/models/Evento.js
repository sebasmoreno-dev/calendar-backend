const { Schema, model } = require('mongoose');

//* Esto modelo es necesario para poder realizar posteos, actualizaciones, para tener información etc...

const EventoSchema = Schema({

  title: {
    type: String,
    require: true
  },
  notes: {
    type: string
  },
  start: {
    type: Date,
    require: true
  },
  end: {
    type: Date,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});


module.exports = model('Evento', EventoSchema );