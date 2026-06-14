import multer from 'multer';
import path from 'path';

// Define target local storage configurations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files go straight into your backend/uploads folder
  },
  filename: (req, file, cb) => {
    // Append unique timestamp hash to prevent filename collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Structural filter gate targeting only raw PDF streams
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.pdf') {
    return cb(new Error('Payload Mismatch: Only standard PDF formats are permitted'), false);
  }
  cb(null, true);
};

// Bundle configurations with a maximum payload cap of 25MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB capacity boundary limit
});

export default upload;