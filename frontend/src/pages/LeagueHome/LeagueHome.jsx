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

  function handleError(err) {
    alert(err);
  }
  function handleSuccess(msg) {
      alert(msg);
  }


  let { leagueId } = useParams();

  async function getLeagueInfo() { //gets info on selected league

    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res;
  }

  async function getTeamInfo() { //gets info on the user's team associated with league
    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}/team`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res;
  }

  async function getSwimmers() { //gets all of the swimmers that are in league

    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}/getSwimmers`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res
  }

  async function getTeams() { //gets array of all the teams in the league
    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}/getTeams`, {
      method: 'GET',
      credentials: 'include'
    });

    let res = await response.json();
    return res
  }

  async function draftSwimmer_(swimmer, socket) {

    console.log("SWIMMER = ", swimmer);

    const response = await fetch(`http://localhost:8080/api/leagues/${leagueId}/draftSwimmer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'    
      },
      credentials: 'include',
      body: JSON.stringify(swimmer)
    });

    let res = await response.json();

    if(res.success) {
      handleSuccess(res.message);

      console.log("connected?", socket.connected);
      socket.emit('user pick', [username, swimmer])
      console.log("shouldve emitted");
      return true;
    }
    else {
      handleError(res.message);
      return false;
    }


  }


  return (
    <>
    <Header username={username} onLogout = {Logout}/>
    {/* Take from the league name */}
    <Body username={username} getLeagueInfo = {getLeagueInfo} getTeamInfo = {getTeamInfo} getSwimmers={getSwimmers} getTeams = {getTeams} draftSwimmer_={draftSwimmer_}/>
  </>
  );
}