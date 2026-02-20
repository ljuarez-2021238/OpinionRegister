import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  publicacionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication', // nombre exacto del modelo de publicaciones
    required: [true, 'El ID de la publicación es obligatorio']
  },
  texto: {
    type: String,
    required: [true, 'El texto es obligatorio'],
    trim: true,
    minlength: [3, 'El comentario debe tener al menos 3 caracteres']
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Comentario = mongoose.model('Comentario', ComentarioSchema);
export default Comentario;