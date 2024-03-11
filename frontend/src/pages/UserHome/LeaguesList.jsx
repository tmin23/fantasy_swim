import React from 'react';
import { styled } from '@mui/material/styles';
import {Grid, Paper, Box, ButtonBase} from '@mui/material'

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
                    <CustomButtonBase component={Item}>
                        League 1
                    </CustomButtonBase>
                </Grid>
                <Grid item xs>
                    <CustomButtonBase component={Item}>
                        League 2
                    </CustomButtonBase>
                </Grid>
                <Grid item xs>
                    <CustomButtonBase component={Item}>
                        League 3
                    </CustomButtonBase>
                </Grid>
            </Grid>
            </Box>
    );
}