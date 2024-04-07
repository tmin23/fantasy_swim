import React from 'react';
import { Link } from 'react-router-dom';
import './LeaguesList.css';
import LeagueBody from '../LeagueHome/LeagueBody.jsx';
import image from '../videos_images/4.jpg'; 
import background_1 from '../videos_images/background_1.jpg';
import picture_6 from '../videos_images/picture_6.jpg'; 
import picture_1 from '../videos_images/picture_1.jpg';
import picture_4 from '../videos_images/picture_4.jpg';
import picture_7 from '../videos_images/picture_7.jpg';


export default function LeaguesList() {
  const handleConnectClick = () => {
    window.location.href = 'https://meet.google.com';
};
    return (
        <div>        
    
            <section class="main">
              <div class="main-top">
                <h1>League List</h1>
              </div>

             <div class="users">
                <div class="card card1">
                <img src={picture_1} alt="Hathaway House"/>

                  <h5>Hathaway House </h5>
                  <p>Troy, New York</p>
                  <div class="per">
                    <table>
                      <tr>
                        <td><span>9🏅</span></td>
                        <td><span>2004</span></td>
                      </tr>
                      <tr>
                        <td>Medal</td>
                        <td>Year</td>
                      </tr>
                    </table>
                   </div>
                   <Link to="/LeagueBody">
                    <button>Profile</button>
                </Link>
            </div>
                

                <div class="card card2">
                <img src={picture_4} alt="Big Apple League"/>
                  <h5>Big Apple League</h5>
                  <p>Troy, New York</p>
                  <div class="per">
                    <table>
                      <tr>
                        <td><span>7🏅</span></td>
                        <td><span>2004</span></td>
                      </tr>
                      <tr>
                        <td>Medal</td>
                        <td>Year</td>
                      </tr>
                    </table>
                  </div>
                  <button>Profile</button>
                </div>
                

                <div class="card card3">
                <img src={picture_6} alt="RPI Swim League"/>
                  <h5>RPI SWIM LEAGUE</h5>
                  <p>Troy, NY</p>
                  <div class="per">
                    <table>
                      <tr>
                        <td><span>5🏅</span></td>
                        <td><span>2004</span></td>
                      </tr>
                      <tr>
                        <td>Medal</td>
                        <td>Year</td>
                      </tr>
                    </table>
                  </div>
                  <button>Profile</button>
                </div>
                
                
                <div class="card card4">
                <img src={picture_7} alt="Naija League"/>
                  <h5>NAIJA LEAGUE</h5>
                  <p>Troy, NY</p>
                  <div class="per">
                    <table>
                      <tr>
                        <td><span>5🏅</span></td>
                        <td><span>2004</span></td>
                      </tr>
                      <tr>
                        <td>Medal</td>
                        <td>Year</td>
                      </tr>
                    </table>
                  </div>
                  <button>Profile</button>
                </div>
              </div>
        
              <section class="ranking">
                <div class="ranking-list">
                  <h1>Ranking List</h1>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Rank</th>
                        <th>Coach</th>
                        <th>Meet Link</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td>01</td>
                        <td>Hathaway House</td>
                        <td>Troy, NY</td>
                        <td>95%</td>
                        <td>Gloria</td>
                        <td><button onClick={handleConnectClick}>Connect</button></td>
                      </tr>

                      <tr class="active">
                        <td>02</td>
                        <td>Big Apple League</td>
                        <td>Troy, NY</td>
                        <td>92%</td>
                        <td>Mike</td>
                        <td><button onClick={handleConnectClick}>Connect</button></td>
                    </tr>


                      <tr>
                        <td>03</td>
                        <td>RPI Swim</td>
                        <td>Troy, NY</td>
                        <td>89%</td>
                        <td>Tony</td>
                        <td><button onClick={handleConnectClick}>Connect</button></td>
                    </tr>


                      <tr>
                        <td>04</td>
                        <td>Naija League</td>
                        <td>Troy, NY</td>
                        <td>85%</td>
                        <td>Ria</td>
                        <td><button onClick={handleConnectClick}>Connect</button></td>
                    </tr>
                    
                    </tbody>
                  </table>
                </div>
              </section>
            </section>
          

            




        </div>
    );
}