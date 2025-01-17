import Profile from './components/Profile';
import MainFeed from './components/MainFeed';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import TopBar from './components/TopBar';
import { About } from './components/About';
import SinglePost from './components/SinglePost';
import Home from './components/Home';

function AppLayout() {
  return (
    <div className="font-EBGaramond grid h-screen grid-rows-[auto_1fr] overflow-hidden border-[1px] border-blue-500 bg-white text-white">
      <Header />
      <div className="mx-64 grid h-full grid-rows-[auto_1fr] overflow-hidden bg-white px-5 text-black">
        <TopBar />
        <div className="overflow-scroll text-xl">
          <Routes>
            <Route path="/" element={<MainFeed />}></Route>
            <Route
              path="public-blog/about"
              element={<About />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
