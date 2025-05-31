const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Upload route
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

const imageUrl = `http://192.168.137.106:3000/uploads/${req.file.filename}`;
  res.json({ filename: req.file.filename, url: imageUrl });
});

module.exports = router;
