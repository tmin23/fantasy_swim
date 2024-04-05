import React, {useState} from 'react';
import { Box, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import './createleague.css'




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
        <Box display='flex' sx = {{ flexDirection: 'column', marginTop: '2%'}}>
            <h1 style={{margin: 'auto'}}>Create League </h1>
            <Box display= 'flex' sx= {{flexDirection: 'column', paddingTop: '1%'}} style = {{width: '25%', margin: 'auto', justifyContent: 'center'}}>
                <form onSubmit = {handleSubmit}>
                <Box display= 'flex' sx= {{flexDirection: 'column', paddingTop: '1%'}} style = {{width: '100%', margin: 'auto', justifyContent: 'center'}}>
                    <FormControl className='forminputs'>
                        <InputLabel htmlFor="my-input" >League Name</InputLabel>
                        <Input value={leagueName} onChange={(e) => setLeagueName(e.target.value)}/>
                    </FormControl>
                    <FormControl className='forminputs'>
                        <InputLabel htmlFor="my-input">League Password</InputLabel>
                        <Input type="password" value={leaguePassword} onChange={(e) => setLeaguePassword(e.target.value)}/>
                    </FormControl>
                    <FormControl className='forminputs'>
                        <InputLabel htmlFor="my-input" >Meet link</InputLabel>
                        <Input value={meetLink} onChange={(e) => setMeetLink(e.target.value)} />
                    </FormControl>
                    <button type="submit">Create League</button>
                </Box>
                </form>
            </Box>
        </Box>

    )
}