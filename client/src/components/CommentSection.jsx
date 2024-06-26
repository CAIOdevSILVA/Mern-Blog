import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Textarea, Alert, Spinner, Modal } from 'flowbite-react';
import { Comment } from './Comment.jsx';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getComment, setGetComment] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();

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
        setGetComment([data, ...getComment]);
      }
    } catch (error) {
      setLoading(false);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/get-post-comment/${postId}`);
        const data = await res.json();

        if (res.ok) {
          setGetComment(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sing-in');
        return;
      }
      const res = await fetch(`/api/comment/like-comment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setGetComment(
          getComment.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setGetComment(
      getComment.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/delete-comment/${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const data = await res.json();
        setGetComment(
          getComment.filter((comment) => comment._id !== commentId)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
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

            <Button
              outline
              gradientDuoTone='purpleToBlue'
              type='submit'
              disabled={loading}
            >
              {loading && (
                <Spinner size={'sm'} color={'purple'} className='mr-2' />
              )}{' '}
              Submit
            </Button>
          </div>
        </form>
      )}

      {commentError && (
        <Alert color={'failure'} className='my-3'>
          {commentError}
        </Alert>
      )}

      {getComment.length === 0 ? (
        <p className='text-sm my-5'>No comments yet</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{getComment.length}</p>
            </div>
          </div>
          {getComment.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={'md'}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want delete your account ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color={'failure'}
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color={'gray'} onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
