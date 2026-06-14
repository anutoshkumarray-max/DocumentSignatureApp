import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number, // Stored in bytes
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Signed'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);