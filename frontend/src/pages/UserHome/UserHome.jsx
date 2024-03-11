import React, {useState} from 'react';
import Header from '../../components/HeaderUserHome';
import LeaguesList from './LeaguesList';


  export default function App() {
    return (
      <>
        <Header />
        <LeaguesList />
      </>
    )
  }