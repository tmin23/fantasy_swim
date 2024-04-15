import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { Icon, Tab, TableContainer } from '@mui/material';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Sample Swimmers
const swimmers = [
    'Tony Min', 
    "Mike Dowd",
    "Slow People",
    "Slower People who shouldn't be on the team",
    "just add people",
    'their names',
    'can go for long',
    'long long long time',
    'but',
    'you be ugly?',
    'work',
];
const SwimmerTable = [
    { id: "01", name: "🧑Mike Dowd", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 8, profileUrl: "https://www.swimcloud.com/swimmer/619459/" },
    { id: "02", name: "🧑Tony Min", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 7, profileUrl: "https://www.swimcloud.com/swimmer/409873/" },
    { id: "03", name: "🧑Dan Chen", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 7, profileUrl: "https://www.swimcloud.com/swimmer/1180940/" },
    { id: "04", name: "🧑Anthony Acciani", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 7, profileUrl: "https://www.swimcloud.com/swimmer/549223/" },
    { id: "05", name: "🧑Jake Fassora", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 5, profileUrl: "https://www.swimcloud.com/swimmer/2310254/" },
    { id: "06", name: "🧑Ethan Gadbois", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 4, profileUrl: "https://www.swimcloud.com/swimmer/619020/" },
    { id: "07", name: "🧑Jimmy Zhen", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 4, profileUrl: "https://www.swimcloud.com/swimmer/1321677/" },
    { id: "08", name: "🧑William Tan", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 2, profileUrl: "https://www.swimcloud.com/swimmer/671785/" },
    { id: "09", name: "🧑Andrew Palmer", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 2, profileUrl: "https://www.swimcloud.com/swimmer/478353/" },
    { id: "10", name: "🧑Dan Savidge", team: "Rensselaer Polytechnic Institute Team", style: "Freestyle", points: 2, profileUrl: "https://www.swimcloud.com/swimmer/818663/" }
];

const SearchBar = ({setSearchQuery}) => (
    <form>
        <TextField
            id = 'search-bar'
            className='text'
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            label='Search Swimmer'
            variant='outlined'
            placeholder= "Swimmer's Name"
            size='small'
        />
            <IconButton type = 'submit' aria-label ='search'>
                <SearchIcon style = {{fill: "black"}} />
            </IconButton>
    </form>
);

const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data.filter((d) => d.toLowerCase().includes(query));
    }
};

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={swimmers[index]} />
        </ListItemButton>
      </ListItem>
    )
};

export default function App() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const dataFiltered = filterData(searchQuery, swimmers);

    return (
        <Grid container spacing = {10} direction = 'row' justifyContent = 'flex-start' alignItems='flex-start'>
            <Grid item style = {{ marginTop: '5px'}}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <div style={{ padding: 3 }}>
                {dataFiltered.map((swimmer, index) => (
                <div key = {index} style={ {marginBottom: '5px'}}>
                    <button
                        className="text"
                        style={{
                            padding: 5,
                            justifyContent: "normal",
                            fontSize: 20,
                            color: "black",
                            margin: 1,
                            width: "250px",
                            border: "1px solid green", // corrected BorderColor to border
                            borderRadius: "100px", // added border radius for rounded corners
                            backgroundColor: "#f0f0f0" // added background color
                        }}
                    key={index} // Using index as the key since there might not be unique IDs
                    >
                        {swimmer}
                    </button>
                </div>))}
                </div>
            </Grid>
            <Grid item style = {{marginTop: '5px'}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style = {{color: 'white'}}>ID</TableCell>
                        <TableCell align="right" style = {{color: 'white'}}>Swimmers</TableCell>
                        <TableCell align="right" style = {{color: 'white'}}>Team</TableCell>
                        <TableCell align="right" style = {{color: 'white'}}>Stroke</TableCell>
                        <TableCell align="right" style = {{color: 'white'}}>Points</TableCell>
                        <TableCell align="right" style = {{color: 'white'}}>Profile</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Swimmers get maped here */}
                        {SwimmerTable.map((row) => (
                            <TableRow>
                                <TableCell style={{color: 'black'}}>{row.id}</TableCell>
                                <TableCell style={{color: 'black'}}>{row.name}</TableCell>
                                <TableCell style={{color: 'black'}}>{row.team}</TableCell>
                                <TableCell style={{color: 'black'}}>{row.style}</TableCell>
                                <TableCell style={{color: 'black'}}>{row.points}</TableCell>
                                <TableCell style={{color: 'blue'}}>{row.profileUrl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
          </Grid>
      );
    }
