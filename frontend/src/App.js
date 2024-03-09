import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/LoginSignup/login-error-page";
import LoginSignup from './pages/LoginSignup/LoginSignup';
import UserHome from "./pages/UserHome/UserHome"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <LoginSignup />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/UserHome",
    element: <UserHome />,
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;