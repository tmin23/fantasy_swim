import React, {useState} from 'react';
import Header from '../../components/Header';
import Body from "./LeagueBody.jsx";
import Roster from "./LeagueRoster.jsx";

export default function App() {
    return (
      <>
      <Header />
      {/* Take from the league name */}
      {/* <Body /> */}
      <Roster />
    </>
    );
  }