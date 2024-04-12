import React, {useState} from 'react';
import { Box, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import './createleague.css'
import video from '../videos_images/video_3.mp4'

export default function App() {
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');
    const [meetLink, setMeetLink] = useState('');

    // Can make these alerts look nicer later
    function handleError(err) {
        alert(err);
    }
    function handleSuccess(msg) {
        alert(msg);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: leagueName,
            meet_link: meetLink,
            password: leaguePassword
        };
        console.log(JSON.stringify(formData));

        console.log(formData);

        try {
            const response = await fetch('http://localhost:8080/api/leagues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'    
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            let res = await response.json()

            if (!response.ok) {
                throw new Error('Failed to create league');
            }

            if (res.success) {
                //reset form fields after submission
                setLeagueName('');
                setLeaguePassword('');
                setMeetLink('');

                handleSuccess(res.message);
                
            }
            else {
                handleError(res.message);
            }
            
            

        } catch (error) {
            console.error('Error creating league', error);
            alert('Failed creating league');
        }
    }

    return (
        <div className="main">
       <video autoPlay muted loop id="video-bg">
        <source src={video} type="video/mp4" />
    Create League Page.
    </video>

       
        <div className="content">
            <h2><span>Build Your Dream League!🏊‍♂️</span></h2>
            <p className="par">Your ultimate destination for creating your custom dream swim leagues!!! <br /> Unleash your inner team manager, strategize like a pro, <br /> Make a splash in the world of fantasy sports! <br /> Create your league now!! <br /> let the waves of victory carry you to greatness!!!</p>

            <button className="cn">DIVE IN!</button>

            <div className="form">
                <h2>Create League</h2>
                <input type="text" name="league_name" placeholder="League Name" value={leagueName} onChange={(e) => setLeagueName(e.target.value)} />
                
                <input type="password" name="league_password" placeholder="League Password" value={leaguePassword} onChange={(e) => setLeaguePassword(e.target.value)} />
              
                <input type="text" name="meet_link" placeholder="Meet Link" value={meetLink} onChange={(e) => setMeetLink(e.target.value)} />
               
                <button className="btnn" onClick={handleSubmit}>Create</button>
            </div>
        </div>
    </div>
);
}