import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import protect from '../middleware/authMiddleware.js';
import Document from '../models/Document.js';

const router = express.Router();

// @route   POST /api/docs/upload
// @desc    Upload an asset file container & log filesystem metadata
// @access  Protected (Requires Day 2 JWT Bearer Token)
router.post('/upload', protect, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Deployment error: No source file provided' });
    }

    // Capture execution parameters from request object maps
    const newDocument = await Document.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size
    });

    res.status(201).json({
      message: 'Document uploaded and logged successfully',
      document: newDocument
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server system exception handling file streaming payload' });
  }
});

// @route   GET /api/docs
// @desc    Retrieve all document structures registered to authenticated user
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server core processing exception while fetching metadata assets' });
  }
});

export default router;