import React from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Paper, Box, ButtonBase} from '@mui/material'
import {Link} from 'react-router-dom'

const Item = styled(Paper)({
    textAlign: 'center',
  });

const CustomButtonBase = styled(ButtonBase)({
    width: '100%',
    height: '300%',
    borderRadius: '4px', // Add borderRadius to match the Paper component
});

export default function LeaguesList() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "50px", marginLeft: "20px", marginRight: "20px" }}>
            <Grid container spacing={3}>
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