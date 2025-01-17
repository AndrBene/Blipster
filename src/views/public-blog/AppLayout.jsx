import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';

function AppLayout() {
  return (
    <div className="font-EBGaramond grid h-screen grid-rows-[auto_1fr] overflow-hidden border-[1px] border-blue-500 bg-white text-white">
      <Header />
      <div className="mx-64 overflow-hidden">
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route
            path="/"
            element={<Navigate replace to="/home" />}
          ></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </div>
      <Link
        to="/create-post"
        className="delay-20 fixed bottom-20 right-20 flex size-24 cursor-pointer flex-col items-center justify-center rounded-full bg-slate-800 text-white transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-125"
      >
        <div>CREATE</div>
        <div>POST</div>
      </Link>
      <div className="fixed bottom-12 right-12 size-10 rounded-full bg-slate-800"></div>
      <div className="fixed bottom-8 right-8 size-5 rounded-full bg-slate-800"></div>
    </div>
  );
}

export default AppLayout;
