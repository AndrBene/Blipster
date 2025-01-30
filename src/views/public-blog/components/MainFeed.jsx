import { useEffect, useState } from 'react';
import Post from './Post';

const limit = 5;

function MainFeed() {
  const [feed, setFeed] = useState([]);
  const [totPages, setTotPages] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);

  useEffect(function () {
    fetch('http://localhost:3000/api/v1/posts/tot-posts')
      .then((res) => res.json())
      .then((json) => {
        setTotPages(Math.ceil(json.data.numPosts / limit));
      });
  }, []);

  useEffect(
    function () {
      fetch(
        `http://localhost:3000/api/v1/posts?page=${currentPageNum}&limit=${limit}`,
      )
        .then((res) => res.json())
        .then((json) => {
          setFeed(json.data.blogPosts);
        });
    },
    [currentPageNum],
  );

  return (
    <div className="">
      <div className="mt-2 border-2 border-white">
        {feed.map((el) => {
          return <Post key={el.title} feed={el} />;
        })}
      </div>
      <div className="my-16 flex justify-center gap-2">
        {Array.from({ length: totPages }, (_, num) => num + 1)?.map(
          (pageNum) => (
            <div
              key={pageNum}
              className={`cursor-pointer rounded-xl border-[1px] ${pageNum === currentPageNum ? 'border-slate-800' : 'border-gray-200 hover:bg-slate-50'} px-5 py-3`}
              onClick={() => {
                setCurrentPageNum(pageNum);
              }}
            >
              {pageNum}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default MainFeed;
