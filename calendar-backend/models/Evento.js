const { Schema, model } = require('mongoose');

//* Esto modelo es necesario para poder realizar posteos, actualizaciones, para tener información etc...

const EventoSchema = Schema({

  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  }
});

/* This is a method that is used to return the object in a specific way. */
EventoSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Evento', EventoSchema );