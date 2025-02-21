import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PageNotFound from './pages/PageNotFound';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import DarkModeProvider from './context/DarkModeContext';

function AppLayout() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden bg-white font-EBGaramond text-white dark:bg-slate-950">
          <Header />
          <div className="mx-64 overflow-hidden">
            <Routes>
              <Route
                exact
                path="/signin"
                element={<Signin />}
              ></Route>
              <Route
                exact
                path="/register"
                element={<Register />}
              ></Route>
              <Route
                exact
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/home" />}
              ></Route>
              <Route
                path="/not-found"
                element={<PageNotFound />}
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
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: { duration: 5000 },
              style: {
                fontSize: '20px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
        </div>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default AppLayout;
