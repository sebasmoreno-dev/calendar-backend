/* Events Routes
  /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('./../middlewares/validar-campos');
const { validarJWT } = require('./../middlewares/validar-jwt');
const { getEventos, createEvent, updateEvento, deleteEvento} = require('./../controllers/events');

const router = Router();

//* Todas tienen que pasar por la validación del JWT
router.use( validarJWT );

//* Obtener eventos
router.get('/', getEventos );

//* Crear un nuevo evento
router.post('/',
[
  check('title','El titulo es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
  validarCampos

],
createEvent);

//* Actualizar evento
router.put('/:id',
[
  check('title','El titulo es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
  validarCampos

],
updateEvento);

//* Borrar evento
router.delete('/:id',deleteEvento);


module.exports = router;