import { Router } from 'express';
import {
  crearComentario,
  listarComentariosPorPublicacion,
  editarComentario,
  eliminarComentario
} from '../Controllers/comentario.controller.js';

const router = Router();

router.post('/', crearComentario);
router.get('/publicacion/:id', listarComentariosPorPublicacion);
router.put('/:id', editarComentario);
router.delete('/:id', eliminarComentario);

export default router;