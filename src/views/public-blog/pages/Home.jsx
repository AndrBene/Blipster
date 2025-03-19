import { Navigate, Route, Routes } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { About } from '../components/About';
import MainFeed from '../components/MainFeed';
import PostDetail from '../components/PostDetail';

function Home() {
  return (
    <div className="scrollbar-none grid h-full w-full grid-rows-[auto_1fr] overflow-x-visible overflow-y-scroll bg-white text-black dark:bg-slate-950 dark:text-white sm:w-11/12 lg:w-10/12 2xl:w-9/12">
      <TopBar />
      <div className="text-xl">
        <Routes>
          <Route path="home" element={<MainFeed />}></Route>
          <Route path="public-blog/about" element={<About />}></Route>
          <Route
            path="public-blog/single-post/:id"
            element={<PostDetail />}
          ></Route>
          <Route
            path="/*"
            element={<Navigate replace to="/not-found" />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Home;
