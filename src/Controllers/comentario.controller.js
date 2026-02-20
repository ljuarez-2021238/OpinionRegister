import Comentario from '../Models/comentario.model.js';
import Publication from '../Models/publication.model.js';

export const crearComentario = async (req, res) => {
  try {
    const { publicacionId, texto, autor } = req.body;

    if (!publicacionId || !texto || !autor) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar existencia de la publicación
    const publicacion = await Publication.findById(publicacionId);
    if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' });

    const comentario = new Comentario({ publicacionId, texto, autor });
    await comentario.save();

    res.status(201).json(comentario);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errores });
    }
    res.status(500).json({ error: 'Error creando comentario' });
  }
};

export const listarComentariosPorPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const publicacion = await Publication.findById(id);
    if (!publicacion) return res.status(404).json({ error: 'Publicación no encontrada' });

    const comentarios = await Comentario.find({ publicacionId: id });
    res.json(comentarios);
  } catch {
    res.status(500).json({ error: 'Error listando comentarios' });
  }
};

export const editarComentario = async (req, res) => {
  try {
    const { texto, autor } = req.body;
    const { id } = req.params;

    if (!texto) return res.status(400).json({ error: 'El texto es obligatorio para editar' });

    const comentario = await Comentario.findById(id);
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });

    if (comentario.autor !== autor) {
      return res.status(403).json({ error: 'Solo el autor puede editar el comentario' });
    }

    comentario.texto = texto;
    await comentario.save();
    res.json(comentario);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errores });
    }
    res.status(500).json({ error: 'Error editando comentario' });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const { autor } = req.body;
    const { id } = req.params;

    const comentario = await Comentario.findById(id);
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });

    if (comentario.autor !== autor) {
      return res.status(403).json({ error: 'Solo el autor puede eliminar el comentario' });
    }

    await Comentario.findByIdAndDelete(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Error eliminando comentario' });
  }
};