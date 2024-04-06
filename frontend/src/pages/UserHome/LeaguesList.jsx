import React from 'react';
import './LeaguesList.css';
import image from '../videos_images/4.jpg'; 
import background_1 from '../videos_images/background_1.jpg';
import picture_6 from '../videos_images/picture_6.jpg'; 
import picture_1 from '../videos_images/picture_1.jpg';
import picture_4 from '../videos_images/picture_4.jpg';
import picture_7 from '../videos_images/picture_7.jpg';

import createleague_logo from '../videos_images/createleague_logo.png';


export default function LeaguesList() {
    return (
        <div>
            <div class="container">
        <nav>
          <ul>
            <li><a href="#" class="logo">
            <img src={createleague_logo} alt="logo" />

            <span className="nav-item">Home</span>
            </a></li>

            <li><a href="../CreateLeague/CreateLeague.html">
              <i class="fas fa-menorah"></i>
              <span class="nav-item">Create League</span>
            </a></li>
            
            <li><a href="#">
              <i class="fas fa-comment"></i>
              <span class="nav-item">Squads</span>
              
            </a></li>
            <li><a href="#">
              <i class="fas fa-database"></i>
              <span class="nav-item">Event</span>
            </a></li>
            <li><a href="#">
              <i class="fas fa-chart-bar"></i>
              <span class="nav-item">Accomplishments</span>
            </a></li>
            
    
            <li><a href="#" class="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span class="nav-item">Log out</span>
            </a></li>
          </ul>
        </nav>
    
    
        <section class="main">
          <div class="main-top">
            <h1>League List</h1>
          </div>
       

          <div class="users">
            <div class="card card1">
            <img src={picture_1} alt="picture1" />

              <h4>Hathaway House </h4>
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
              <button onclick="window.location.href='https://meet.google.com'">Profile</button>
            </div>

            

            <div class="card card2">
            <img src={picture_4} alt="picture4" />
              <h4>Big Apple League</h4>
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
            <img src={picture_6} alt="picture6" />

              <h4>RPI Swim League</h4>
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
            <img src={picture_7} alt="picture7" />
              <h4>NAIJA LEAGUE</h4>
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
                    <td><button onclick="window.location.href='https://meet.google.com'">Connect</button></td>
                  </tr>

                  <tr class="active">
                    <td>02</td>
                    <td>Big Apple League</td>
                    <td>Troy, NY</td>
                    <td>92%</td>
                    <td>Mike</td>
                    <td><button onclick="window.location.href='https://meet.google.com'">Connect</button></td>
                </tr>


                  <tr>
                    <td>03</td>
                    <td>RPI Swim</td>
                    <td>Troy, NY</td>
                    <td>89%</td>
                    <td>Tony</td>
                    <td><button onclick="window.location.href='https://meet.google.com'">Connect</button></td>
                </tr>


                  <tr>
                    <td>04</td>
                    <td>Naija League</td>
                    <td>Troy, NY</td>
                    <td>85%</td>
                    <td>Ria</td>
                    <td><button onclick="window.location.href='https://meet.google.com'">Connect</button></td>
                </tr>
                 
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>





        </div>
    );
}