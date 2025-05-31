import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

export default mongoose.model('User', userSchema);
