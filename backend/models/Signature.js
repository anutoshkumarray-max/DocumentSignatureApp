import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Document'
  },
  signer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // Precise placement mappings
  coordinateX: {
    type: Number,
    required: true
  },
  coordinateY: {
    type: Number,
    required: true
  },
  pageNumber: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    required: true,
    enum: ['Placed', 'Executed'],
    default: 'Placed'
  }
}, { timestamps: true });

export default mongoose.model('Signature', signatureSchema);