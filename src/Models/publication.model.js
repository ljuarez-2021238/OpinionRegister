
import mongoose from 'mongoose';

const PublicacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true,
  },
  texto: {
    type: String,
    required: [true, 'El texto es obligatorio'],
    trim: true,
    minlength: [10, 'El texto debe tener al menos 10 caracteres'],
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true,
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria'],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'La fecha no puede ser futura',
    },
  },
});


export default mongoose.model('Publicacion', PublicacionSchema);