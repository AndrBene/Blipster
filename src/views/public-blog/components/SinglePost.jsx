import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';

function SinglePost() {
  const { id } = useParams();
  const [content, setContent] = useState([]);

  useEffect(function () {
    fetch(`http://localhost:3000/api/v1/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(
          'ret blogPost: ',
          json.data.blogPost.comments.length,
        );
        setContent(json.data.blogPost);
      });
  }, []);

  return (
    <div className="mt-10 flex flex-col justify-start">
      <Link
        to="/"
        className="flex w-fit cursor-pointer items-center justify-start gap-2 border-b-[1px] border-slate-800 dark:border-white"
      >
        {/* <img src="/back_arrow.png" alt="not found" className="h-5" /> */}
        <HiArrowLongLeft className="size-5" />
        <div className="text-base text-slate-800 dark:text-white">
          Home
        </div>
      </Link>
      <div className="mt-10 text-4xl font-bold">{content.title}</div>
      <div className="my-12">
        <img
          src={`/posts/images/${content.image}`}
          className="w-96 rounded-md"
          alt="Not found"
        />
        <div className="pt-10">{content.content}</div>
      </div>
      <Comments comments={content.comments} />
    </div>
  );
}

export default SinglePost;
