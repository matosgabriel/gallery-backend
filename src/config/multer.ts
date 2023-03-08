import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const storage = multer.diskStorage({
  destination: tmpFolder,
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[1]; // Get the file extension

    const newName = file.originalname.split('.')[0] + `-` + crypto.randomBytes(10).toString('hex') + `.${extension}`;

    cb(null, newName); // Returns new name
  }
});

const multerConfig = {
  directory: tmpFolder,
  storage
}

export { multerConfig }