import React, {useState} from 'react';
import { Button, CircularProgress } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import './joinleague.css'
import video from '../videos_images/video_3.mp4'

export default function App() {
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Can make these alerts look nicer later
    function handleError(err) {
        alert(err);
    }
    function handleSuccess(msg, leagueId) {
        alert(msg);
        navigate(`/LeagueHome/${leagueId}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            name: leagueName,
            password: leaguePassword,
            teamName: teamName
        };
        console.log(JSON.stringify(formData));

        console.log(formData);

        try {
            const response = await fetch('http://localhost:8080/api/leagues/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'    
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            let res = await response.json()


            if (res.success) {
                setLoading(false);
                //reset form fields after submission
                setLeagueName('');
                setLeaguePassword('');
                setTeamName('');

                handleSuccess(res.message, res.id);
                
            }
            else {
                setLoading(false);
                handleError(res.message);
            }
            
            

        } catch (error) {
            setLoading(false);
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
            <h2><span>Join Existing League!🏊‍♂️</span></h2>
            <p className="par">Enter in the League Name and Password</p>

            <div className="form">
                <h2>Create League</h2>
                <input type="text" name="league_name" placeholder="League Name" value={leagueName} onChange={(e) => setLeagueName(e.target.value)} />

                <input type="text" name="team_name" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                
                <input type="password" name="league_password" placeholder="League Password" value={leaguePassword} onChange={(e) => setLeaguePassword(e.target.value)} />

                <Button
                    className = 'btnn'
                    style={{ marginTop: '15px', marginLeft: '10px' }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={handleSubmit}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                    {loading ? 'Loading...' : 'Join'}
                </Button>
            </div>
        </div>
    </div>
);
}