import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Textarea, Alert, Spinner } from 'flowbite-react';

export const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/comment/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setComment('');
      }
    } catch (error) {
      setLoading(false);
      setCommentError(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed is as:</p>
          <img
            className='w-5 h-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt='user image'
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-cyan-600 font-semibold text-xs hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm my-5 flex gap-1'>
          You must be signed in to comment →
          <Link
            to={'/sign-in'}
            className='text-cyan-600 font-semibold hover:underline'
          >
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className='border boder-teal-500 rounded-md p-3'
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />

          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {comment.length} - 200 characters remaining
            </p>

            <Button outline gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
              {loading && <Spinner size={'sm'} color={'purple'} className='mr-2'/>} Submit
            </Button>
          </div>
        </form>
      )}

      {commentError && <Alert color={'failure'} className='mt-3'>{commentError}</Alert>}
    </div>
  );
};
