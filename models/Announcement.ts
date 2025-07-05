import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent model redefinition in Next.js
export default mongoose.models?.Announcement || 
       mongoose.model('Announcement', announcementSchema);