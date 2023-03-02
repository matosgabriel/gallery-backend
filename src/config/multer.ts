import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/'); // Define the temp folder as files destination
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[1]; // Get the file extension

    const newName = file.originalname.split('.')[0] + `-` + crypto.randomBytes(16).toString('hex') + `.${extension}`;

    cb(null, newName); // Returns new name
  }
});

export { storage }