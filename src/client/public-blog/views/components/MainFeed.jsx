import { useEffect, useState } from 'react';
import Post from './Post';
import Loader from './Loader';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const limit = 5;

function MainFeed() {
  const [feed, setFeed] = useState([]);
  const [totPages, setTotPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNum = Number(searchParams.get('page')) || 1;

  useEffect(function () {
    async function fetchTotPosts() {
      try {
        await fetch('/api/v1/posts/tot-posts')
          .then((res) => res.json())
          .then((json) => {
            setTotPages(Math.ceil(json.data.numPosts / limit));
          });
      } catch (error) {
        toast.error(`Server error: ${error}`);
      }
    }

    fetchTotPosts();
  }, []);

  useEffect(
    function () {
      async function fetchPosts() {
        localStorage.setItem('currentPageNum', currentPageNum);
        setIsLoading(true);
        try {
          await fetch(
            `/api/v1/posts?page=${currentPageNum}&limit=${limit}`,
          )
            .then((res) => res.json())
            .then((json) => {
              setFeed(json.data.blogPosts);
            })
            .finally(() => setIsLoading(false));
        } catch (error) {
          toast.error(`Server error: ${error}`);
        }
      }

      fetchPosts();
    },
    [currentPageNum],
  );

  return (
    <>
      {isLoading ? (
        <Loader text={'posts'} />
      ) : (
        <div>
          <div className="mt-2">
            {feed.map((el) => {
              return <Post key={el.title} feed={el} />;
            })}
          </div>
          <div className="my-16 flex justify-center gap-2">
            {Array.from(
              { length: totPages },
              (_, num) => num + 1,
            )?.map((pageNum) => (
              <div
                key={pageNum}
                className={`cursor-pointer rounded-xl border-[1px] ${pageNum === currentPageNum ? 'border-slate-800 dark:border-white' : 'border-gray-200 hover:bg-slate-50 dark:border-slate-500 dark:hover:bg-slate-900'} px-3 py-2 xl:px-5 xl:py-3`}
                onClick={() => {
                  // setCurrentPageNum(pageNum);
                  setSearchParams({ page: pageNum });
                }}
              >
                {pageNum}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MainFeed;
