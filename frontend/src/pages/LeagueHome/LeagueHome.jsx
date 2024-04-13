import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Header from '../../components/Header';
import Body from "./LeagueBody.jsx"


export default function App() {

  //-----------------------------Ensures user is logged in ----------------------------------------------------
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
  //------------------------------Ensures user is logged in------------------------------------------




  let { leagueId } = useParams();

  async function getLeagueInfo() { //gets info on selected league

    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res;
  }

  async function getTeamInfo() {
    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}/team`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res;
  }


  return (
    <>
    <Header username={username} onLogout = {Logout}/>
    {/* Take from the league name */}
    <Body getLeagueInfo = {getLeagueInfo} getTeamInfo = {getTeamInfo}/>
  </>
  );
}