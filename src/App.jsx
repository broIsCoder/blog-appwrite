import { Outlet } from 'react-router-dom'
import { Alert, Footer, Header,InfoAlert } from '../src/components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout, startLoading, stopLoading } from './store/authSlice';
import { showAlert } from './store/alertSlice';

function App() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.alert.show);
  const infoShow = useSelector((state) => state.infoAlert.show);

  // try to login
  useEffect(() => {
    dispatch(startLoading());
    async function getUser() {
      await authService.getCurrentUser().then((user) => {
        if (user) {
          dispatch(login({userData:user}));
          dispatch(showAlert({
            message: "You are logged in ! Welcome Back",
            type:'success'
          }));
        } else {
          dispatch(logout());
          dispatch(showAlert({
            message: "You are logged out !",
            type: "warning"
          }));
        };
        dispatch(stopLoading());
      });
    }

    getUser();

  }, [])

  return (
    <div className='relative'>
      <InfoAlert show={infoShow} />
      <Alert show={show} />
      {!loading ?
        <div className='flex flex-wrap content-between bg-black text-white'>
          <div className='w-full min-h-screen flex flex-col'>
            <Header />
            <main className='w-full min-h-full'>
              <Outlet />
            </main>
          </div>
          <div className="w-full block">
            <Footer />
          </div>
        </div>
        :
        <div className="w-screen h-screen flex justify-center items-center">
          <img
            src="/vite.svg"
            className="w-20 h-20 ease-in-out infinite animate-bounce"
            alt="loading"
          />
        </div>}
    </div>

  )

}

export default App
