import { useEffect, useState } from 'react';
import { Link, useParams }  from 'react-router-dom';

import { Spinner, Button } from 'flowbite-react';

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  
  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get-posts?slug=${postSlug}`);
        const data = await res.json();

        if(!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
          setError(true);
          setLoading(false);
      }
    }
    fetchPost();
  }, [postSlug]);

  if(loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size={'xl'}/>
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post?.title}</h1>
      <Link to={`/search?category=${post?.category}`} className='self-center mt-5'>
        <Button color={'gray'} pill size={'xs'}>{post?.category}</Button>
      </Link>

      <img src={post?.image} alt={post?.title} className='p-3 max-h-[600px] w-full object-cover'/>

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{(post?.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div dangerouslySetInnerHTML={{ __html: post?.content }} className='p-3 mx-auto max-w-2xl w-full post-content'></div>
    </main>
  )
}

export default PostPage