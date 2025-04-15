import { useNavigate, useParams } from 'react-router-dom';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from './Loader';
import toast from 'react-hot-toast';

function PostDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    isFetching,
    isError,
    data: postContent,
  } = useQuery({
    queryKey: [`post-${id}`],
    queryFn: fetchPostContent,
    meta: {
      protectedRouteErrorMessage: "Couldn't fetch post content",
    },
  });

  const [pageNum, setPageNum] = useState('1');

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

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPageNum');
    if (savedPage) {
      setPageNum(savedPage);
    }
  }, []);

  if (isError) {
    toast.error('Error fetching post details');
    navigate(`/home?page=${pageNum}`);
  }

  return (
    <>
      {isFetching ? (
        <Loader text={'post content'} />
      ) : (
        <div className="my-10 flex flex-col justify-start gap-y-10 overflow-x-visible">
          <div
            className="flex w-fit cursor-pointer items-center justify-start gap-2 border-b-[1px] border-slate-800 dark:border-white"
            onClick={() => {
              navigate(`/home?page=${pageNum}`);
            }}
          >
            <HiArrowLongLeft className="size-5" />
            <div className="text-sm text-slate-800 xl:text-base dark:text-white">
              Home
            </div>
          </div>
          <div className="text-xl font-bold xl:text-4xl">
            {postContent.title}
          </div>
          <div className="flex flex-col justify-start gap-y-10">
            {postContent?.image && (
              <img
                src={`/posts/images/${postContent.image}`}
                className="w-80 rounded-md xl:w-96"
                alt="Not found"
              />
            )}
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

export default PostDetail;
