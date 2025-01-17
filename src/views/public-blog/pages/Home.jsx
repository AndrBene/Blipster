import { Route, Routes } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { About } from '../components/About';
import MainFeed from '../components/MainFeed';
import SinglePost from '../components/SinglePost';

function Home() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden bg-white px-5 text-black">
      <TopBar />
      <div className="overflow-scroll text-xl">
        <Routes>
          <Route path="/home" element={<MainFeed />}></Route>
          <Route path="public-blog/about" element={<About />}></Route>
          <Route
            path="public-blog/single-post/:id"
            element={<SinglePost />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Home;
