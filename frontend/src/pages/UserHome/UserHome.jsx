import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Header from '../../components/Header';
import LeaguesList from './LeaguesList';

export default function App() {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");


  useEffect(() => {
    async function verifyCookie() {
      // If there's no token cookie, then user is not logged in
      if(!cookies.token) {
        navigate('/login');
      }

      const response = await fetch('http://localhost:8080/api/users/auth', {
        method: 'POST',
        credentials: 'include',
      });

      let res = await response.json();

      if (res.status) {
        setUsername(res.user);
      } else {
        removeCookie("token");
        navigate("/login");
      }
    }

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  function Logout() {
    removeCookie("token");
    navigate("/login");
  }


  return (
    <>
      <Header username={username} onLogout = {Logout} />
      <LeaguesList />
    </>
)}
