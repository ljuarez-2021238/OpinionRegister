
import express from 'express';
import * as publicacionController from '../Controllers/publication.controller.js';

const router = express.Router();


router.post('/', publicacionController.crearPublicacion);
router.get('/', publicacionController.listarPublicaciones);
router.get('/:id', publicacionController.obtenerPublicacionPorId);
router.put('/:id', publicacionController.editarPublicacion);
router.delete('/:id', publicacionController.eliminarPublicacion);


export default router;