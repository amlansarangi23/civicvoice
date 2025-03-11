import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'issues', // Folder where images will be stored
    format: file.mimetype.split('/')[1], // Ensures format matches file type
    public_id: `${Date.now()}-${file.originalname}`, // Unique file name
  }),
});

const upload = multer({ storage });

export default upload;
