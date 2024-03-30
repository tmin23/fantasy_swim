import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/LoginSignup/login-error-page";
import LoginSignup from './pages/LoginSignup/LoginSignup';
import UserHome from "./pages/UserHome/UserHome";
import LeagueHome from "./pages/LeagueHome/LeagueHome";
import CreateLeague from "./pages/CreateLeague/CreateLeague"
import Signup from "./pages/LoginSignup/Signup"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const router = createBrowserRouter([
  {
    path: "/Login", 
    element: <LoginSignup />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/",
    element: <UserHome />,
  },

  {
    path: "/LeagueHome",
    element: <LeagueHome />,
  },
  {
    path: "/CreateLeague",
    element: <CreateLeague />
  },
  {
    path: "/Signup",
    element: <Signup />
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