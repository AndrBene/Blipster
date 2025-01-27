import { useEffect, useState } from 'react';
import Post from './Post';

function MainFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(function () {
    fetch('http://localhost:3000/api/v1/posts')
      .then((res) => res.json())
      .then((json) => {
        setFeed(json.data.blogPosts);
      });
  }, []);

  return (
    <div>
      <div className="mt-2 border-2 border-white">
        {feed.map((el) => {
          return <Post key={el.title} feed={el} />;
        })}
      </div>
    </div>
  );
}

export default MainFeed;
