import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import { useEffect } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from './Loader';

function SinglePost() {
  const { id } = useParams();

  const { isLoading, data: postContent } = useQuery({
    queryKey: [`post-${id}`],
    queryFn: fetchPostContent,
    meta: {
      protectedRouteErrorMessage: "Couldn't fetch post content",
    },
  });

  async function fetchPostContent() {
    const res = await fetch(
      `http://localhost:3000/api/v1/posts/${id}`,
    );
    const json = await res.json();

    return json.data.blogPost;
  }

  const queryClient = useQueryClient();

  useEffect(function () {
    return () => {
      queryClient.removeQueries(`post-${id}`);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader text={'post content'} />
      ) : (
        <div className="my-10 flex flex-col justify-start gap-y-10 overflow-x-visible">
          <Link
            to="/"
            className="flex w-fit cursor-pointer items-center justify-start gap-2 border-b-[1px] border-slate-800 dark:border-white"
          >
            <HiArrowLongLeft className="size-5" />
            <div className="text-sm text-slate-800 dark:text-white xl:text-base">
              Home
            </div>
          </Link>
          <div className="text-xl font-bold xl:text-4xl">
            {postContent.title}
          </div>
          <div className="flex flex-col justify-start gap-y-10">
            <img
              src={`/posts/images/${postContent.image}`}
              className="w-80 rounded-md xl:w-96"
              alt="Not found"
            />
            <div className="text-base xl:text-xl">
              {postContent.content}
            </div>
          </div>
          <Comments comments={postContent.comments} />
        </div>
      )}
    </>
  );
}

export default SinglePost;
