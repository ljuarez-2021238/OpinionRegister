const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

router.post('/', publicacionController.crearPublicacion);
router.get('/', publicacionController.listarPublicaciones);
router.get('/:id', publicacionController.obtenerPublicacionPorId);
router.put('/:id', publicacionController.editarPublicacion);
router.delete('/:id', publicacionController.eliminarPublicacion);

module.exports = router;