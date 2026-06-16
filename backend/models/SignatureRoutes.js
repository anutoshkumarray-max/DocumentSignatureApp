import express from 'express';
import protect from '../middleware/authMiddleware.js';
import Signature from '../models/Signature.js';
import Document from '../models/Document.js';

const router = express.Router();

// @route   POST /api/signatures/place
// @desc    Save exact signature positioning coordinates (x, y)
// @access  Protected
router.post('/place', protect, async (req, res) => {
  try {
    const { documentId, coordinateX, coordinateY, pageNumber } = req.body;

    if (!documentId || coordinateX === undefined || coordinateY === undefined) {
      return res.status(400).json({ message: 'Missing coordinate tracking parameters' });
    }

    // Verify target document exists
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Target document block not found' });
    }

    // Create placement log
    const signature = await Signature.create({
      document: documentId,
      signer: req.user._id,
      coordinateX,
      coordinateY,
      pageNumber: pageNumber || 1
    });

    res.status(201).json({
      message: 'Signature coordinates sealed successfully',
      signature
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server system exception handling placement vectors' });
  }
});

// @route   GET /api/signatures/doc/:documentId
// @desc    Fetch all signature positions logged for a specific document
// @access  Protected
router.get('/doc/:documentId', protect, async (req, res) => {
  try {
    const signatures = await Signature.find({ document: req.params.documentId });
    res.json(signatures);
  } catch (error) {
    res.status(500).json({ message: 'Server core exception while fetching coordinate models' });
  }
});

export default router;