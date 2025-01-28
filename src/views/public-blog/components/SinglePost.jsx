import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import { useEffect, useState } from 'react';

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
        className="flex cursor-pointer items-center justify-start gap-2"
      >
        <img src="/back_arrow.png" alt="not found" className="h-5" />
        <div className="text-base text-slate-800">Home</div>
      </Link>
      <div className="mt-10 text-4xl font-bold">{content.title}</div>
      <div className="my-12">
        <img
          src={`/images/${content.image}`}
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
