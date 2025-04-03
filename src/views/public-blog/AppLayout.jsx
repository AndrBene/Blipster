import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PageNotFound from './pages/PageNotFound';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import Profile from './components/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // (60 * 1000 ms) = 1 minute
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta.protectedRouteErrorMessage) {
        toast.error(query.meta.protectedRouteErrorMessage);
        console.log(query.meta.protectedRouteErrorMessage);
      }
    },
  }),
});

function AppLayout() {
  const [isCreatePost, setIsCreatePost] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden bg-white font-EBGaramond text-white dark:bg-slate-950">
        <Header />
        <div className="flex justify-center overflow-hidden">
          <div className="flex w-11/12 justify-center overflow-hidden">
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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                exact
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost setIsCreatePost={setIsCreatePost} />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/home?page=1" />}
              ></Route>
              <Route
                path="/not-found"
                element={<PageNotFound />}
              ></Route>
              <Route path="/*" element={<Home />}></Route>
            </Routes>
          </div>
        </div>
        {!isCreatePost && (
          <>
            <Link
              to="/create-post"
              className="delay-20 fixed bottom-8 right-8 flex size-20 cursor-pointer flex-col items-center justify-center rounded-full bg-slate-800 text-sm text-white transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-125 md:bottom-14 md:right-14 md:size-20 md:text-base xl:bottom-20 xl:right-20 xl:size-24 xl:text-lg dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              <div>CREATE</div>
              <div>POST</div>
            </Link>
            <div className="fixed bottom-12 right-12 hidden size-10 rounded-full bg-slate-800 md:bottom-9 md:right-9 md:block md:size-8 xl:bottom-12 xl:right-12 xl:block xl:size-10 dark:bg-white"></div>
            <div className="fixed bottom-5 right-5 size-5 rounded-full bg-slate-800 xl:bottom-8 xl:right-8 dark:bg-white"></div>
          </>
        )}
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
    </QueryClientProvider>
  );
}

export default AppLayout;
