import React, {useState, useEffect, useRef} from "react";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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


export default function Body({getLeagueInfo, getTeamInfo, getSwimmers}) {
  const [leagueName, setLeagueName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [swimmerInfo, setSwimmerInfo] = useState([]);

  useEffect( () => { //gets the league info on page render
    async function fetch_leagues() {
      let leagueInfo = await getLeagueInfo();
      setLeagueName(leagueInfo.name);
    }

    async function fetch_team_info() {
      let teamInfo = await getTeamInfo();
      setTeamName(teamInfo.team);
    }

    async function get_swimmers() {
      let swimmerInfo = await getSwimmers(); //the info of all swimmers in league
      setSwimmerInfo(swimmerInfo);
    }

    fetch_leagues();
    fetch_team_info();
    get_swimmers();
  }, []);


  const SearchBar = ({setSearchQuery}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
    }

    const inputRef = useRef(null);

    useEffect(() => {
        // Set focus on the input field when the component mounts or searchQuery changes
        inputRef.current.focus();
    }, [searchQuery]);

    return (
    <form onSubmit={handleSubmit}>
        <TextField
            id = 'search-bar'
            disableAutoFocus={true}
            className='text'
            value = {searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
            }}
            label='Search Swimmer'
            variant='outlined'
            placeholder= "Swimmer's Name"
            size='small'
            inputRef={inputRef} // Set inputRef to the ref created
        />
            <IconButton type = 'submit' aria-label ='search'>
                <SearchIcon style = {{fill: "black"}} />
            </IconButton>
    </form>
)};

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
            <ListItemText primary='yo' />
          </ListItemButton>
        </ListItem>
      )
  };
  const swimmer_names = []
  for(let i=0; i< swimmerInfo.length; i++) {
    swimmer_names.push(swimmerInfo[i].name);
  }
  console.log(swimmerInfo);
  swimmer_names.sort((swimmer1, swimmer2) => {
    if(swimmer1.name < swimmer2.name){
      return -1;
    }
    else {
      return 1;
    }
  });

  swimmerInfo.sort((swimmer1, swimmer2) => {
    if(swimmer1.name < swimmer2.name){
      return -1;
    }
    else {
      return 1;
    }
  });

  const [searchQuery, setSearchQuery] = React.useState("");
  const dataFiltered = filterData(searchQuery, swimmer_names);

  return (
      <Grid container spacing = {10} direction = 'row' justifyContent = 'flex-start' alignItems='flex-start'>
          <Grid item style = {{ marginTop: '5px', marginLeft: '5px'}}>
              <SearchBar searchQuery={searchQuery} style = {{marginTop: '10px'}} setSearchQuery={setSearchQuery}/>
              <div style={{ padding: 3 }}>
                <div style={ {marginBottom: '5px', height: '750px', width: "275px", overflowY: 'scroll'}}>

                  {dataFiltered.map((swimmer, index) => (
                    <button
                        key={swimmerInfo[index]}
                        className="text"
                        style={{
                            padding: 5,
                            justifyContent: "normal",
                            fontSize: 20,
                            color: "black",
                            margin: 0,
                            width: "250px",
                            border: "1px solid green", // corrected BorderColor to border
                            borderRadius: "100px", // added border radius for rounded corners
                            backgroundColor: "#f0f0f0" // added background color
                        }}
                      >
                          {swimmer}<br></br>  {swimmerInfo[index].team}
                      </button>
                    ))}
                </div>
              </div>
          </Grid>
          <Grid item style = {{marginTop: '5px', marginLeft: '10%', width: '800px'}}>
            <h1 style={{margin: '0'}}>{teamName}</h1>
            <h6>{leagueName}</h6>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell style = {{color: 'white'}}>ID</TableCell>
                      <TableCell align="left" style = {{color: 'white'}}>Swimmers</TableCell>
                      <TableCell align="left" style = {{color: 'white'}}>Team</TableCell>
                      <TableCell align="left" style = {{color: 'white'}}>Stroke</TableCell>
                      <TableCell align="left" style = {{color: 'white'}}>Points</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                      {swimmerInfo.map((swimmer, index) => (
                        <TableRow key = {index}>
                            <TableCell style={{color: 'black'}}>{index}</TableCell>
                            <TableCell style={{color: 'black'}}>{swimmer.name}</TableCell>
                            <TableCell style={{color: 'black'}}>{swimmer.team}</TableCell>
                            <TableCell style={{color: 'black'}}>{"None"}</TableCell>
                            <TableCell style={{color: 'black'}}>{0}</TableCell>
                        </TableRow>
                      ))}

                  </TableBody>
              </Table>
          </TableContainer>
          </Grid>
        </Grid>
    );
  }
