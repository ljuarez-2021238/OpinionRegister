
import Publication from '../Models/publication.model.js'; 


export const crearPublicacion = async (req, res) => {
    try {
        const nuevaPublicacion = await Publication.create(req.body);
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const listarPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publication.find();
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publication.findById(id);
        if (!publicacion) return res.status(404).json({ message: 'No encontrada' });
        res.json(publicacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const editarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacionActualizada = await Publication.findByIdAndUpdate(id, req.body, { new: true });
        if (!publicacionActualizada) return res.status(404).json({ message: 'No encontrada' });
        res.json(publicacionActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminada = await Publication.findByIdAndDelete(id);
        if (!eliminada) return res.status(404).json({ message: 'No encontrada' });
        res.json({ message: 'Eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};