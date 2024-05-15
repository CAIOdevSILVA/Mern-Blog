import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: 'https://resources.workable.com/wp-content/uploads/2019/04/what-to-look-for-in-resumes-v2-02-featured-560x313.png',
  },
  category: {
    type: String,
    default: 'uncategorized'
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;