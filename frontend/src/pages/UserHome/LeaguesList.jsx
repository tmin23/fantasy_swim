import React from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Paper, Box, ButtonBase} from '@mui/material'
import {Link} from 'react-router-dom'

const Item = styled(Paper)({
    textAlign: 'center',
  });

const CustomButtonBase = styled(ButtonBase)({
    width: '100%',
    height: '990%',
    borderRadius: '10px', // Add borderRadius to match the Paper component
});

export default function LeaguesList() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "200px", marginLeft: "50px", marginRight: "50px" }}>
            <Grid container spacing={5}>
                <Grid item xs>
                    <Link to="/LeagueHome">
                        <CustomButtonBase component={Item}>
                            
                            Hathawayyyyy House League
                        </CustomButtonBase>
                        </Link>
                </Grid>
                
                <Grid item xs>
                    <CustomButtonBase component={Item}>
                        Big Apple League
                    </CustomButtonBase>
                </Grid>
                <Grid item xs>
                    <CustomButtonBase component={Item}>
                        RPI Swimming League
                    </CustomButtonBase>
                </Grid>
            </Grid>
            </Box>
    );
}