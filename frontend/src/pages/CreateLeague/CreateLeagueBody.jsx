import React, {useState} from 'react';
import { Box, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import './createleague.css'





export default function App() {
    return (
        <Box display='flex' sx = {{ flexDirection: 'column', marginTop: '2%'}}>
            <h1 style={{margin: 'auto'}}>Create League </h1>
            <Box display= 'flex' sx= {{flexDirection: 'column', paddingTop: '1%'}} style = {{width: '25%', margin: 'auto', justifyContent: 'center'}}>
                <FormControl className='forminputs'>
                    <InputLabel htmlFor="my-input">League Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl className='forminputs'>
                    <InputLabel htmlFor="my-input">League Password</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl className='forminputs'>
                    <InputLabel htmlFor="my-input">Meet link</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
            </Box>
        </Box>

    )
}