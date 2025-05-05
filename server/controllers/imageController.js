const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../Public/Image');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  },
});

// Upload handler
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = `/Public/Image/${req.file.filename}`;
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
};

// Update handler
const updateImage = async (req, res) => {
  try {
    const { oldPath } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No new file provided for update' });
    }

    // Delete the old file if it exists
    const fullOldPath = path.join(__dirname, `../${oldPath}`);
    if (fs.existsSync(fullOldPath)) {
      fs.unlinkSync(fullOldPath);
    }

    const newPath = `/Public/Image${req.file.filename}`;
    res.status(200).json({ message: 'File updated successfully', filePath: newPath });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'File update failed', error: error.message });
  }
};

module.exports = {
  uploadImage,
  updateImage,
  uploadMiddleware: upload.single('image'),
};
