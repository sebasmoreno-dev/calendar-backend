/* Events Routes
  /api/events
 */

const { Router } = require('express');
const { validarJWT } = require('./../middlewares/validar-jwt');
const { getEventos, createEvent, updateEvento, deleteEvento} = require('./../controllers/events');

const router = Router();

//* Todas tienen que pasar por la validación del JWT
router.use( validarJWT );


//* Obtener eventos
router.get('/', getEventos );

//* Crear un nuevo evento
router.post('/', createEvent);

//* Actualizar evento
router.put('/:id', updateEvento);

//* Borrar evento
router.delete('/:id', deleteEvento);


module.exports = router;