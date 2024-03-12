import React, {useState} from 'react';
import Header from '../../components/HeaderLeagueHome';
import Body from "./LeagueBody.jsx"

export default function App() {
    return (
      <>
      <Header />
      {/* Take from the league name */}
      <Body />
    </>
    );
  }