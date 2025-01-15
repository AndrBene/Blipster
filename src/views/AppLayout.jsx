import Profile from './components/Profile';
import MainFeed from './components/MainFeed';
import { Routes, Route, Link } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Link to="/public-blog/s">MainFeed</Link>
      <Routes>
        <Route path="/" element={<Profile />}></Route>
        <Route path="public-blog/s" element={<MainFeed />}></Route>
      </Routes>
    </div>
  );
}

export default AppLayout;
