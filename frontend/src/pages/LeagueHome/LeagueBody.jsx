import React, {useState, useEffect, useRef} from "react";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import { Button, CircularProgress } from "@mui/material";
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
import {io} from "socket.io-client";


export default function Body({username, getLeagueInfo, getTeamInfo, getSwimmers, getTeams, draftSwimmer_, getRoster}) {
  const [leagueInfo, setLeagueInfo] = useState("");
  const [teamInfo, setTeamInfo] = useState("");
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [swimmerInfo, setSwimmerInfo] = useState([]);
  const [swimmer_names, setNames] = useState([]);
  const [drafted_swimmers, setDraftedSwimmers] = useState([]);
  const [teamRoster, setTeamRoster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSocket, setSocket] = useState(null);
  const [currentEventName, setEventName] = useState("");
  const [draftInProgress, setDraftInProgress] = useState(false);
  const [draftCompleted, setDraftCompleted] = useState(false);
  const [yourTurn, setTurn] = useState(false);


  useEffect( () => { //gets the league info on page render
    async function fetch_leagues() {
      let leagueInfo_ = await getLeagueInfo();
      setLeagueInfo(leagueInfo_);
    }

    async function fetch_team_info() {
      let teamInfo_ = await getTeamInfo();
      setTeamInfo(teamInfo_);
    }

    async function fetch_team_roster() {
      let teamRoster_ = await getRoster();
      setTeamRoster(teamRoster_.swimmers);
    }

    async function get_swimmers() {
      let swimmerInfo = await getSwimmers(); //the info of all swimmers in league
      

      const swimmerNames = []
      for(let i=0; i< swimmerInfo.length; i++) {
        swimmerNames.push(swimmerInfo[i].name);
      }

      swimmerNames.sort();

      swimmerInfo.sort((swimmer1, swimmer2) => {
        if(swimmer1.name < swimmer2.name){
          return -1;
        }
        else {
          return 1;
        }
      });

      let swimmerNames_ = []
      swimmerNames.forEach((swimmer, index) => {
        swimmerNames_.push({"name": swimmer, "index": index});
      })

      setSwimmerInfo(swimmerInfo);
      setNames(swimmerNames_);
      setIsLoading(false);
    }

    async function get_teams() {
      let info = await getTeams();
      setTeamsInfo(info); 
    }

    fetch_leagues();
    fetch_team_info();
    get_swimmers();
    get_teams();
    fetch_team_roster();
    
  }, []);

  useEffect(() => { //useEffect for drafting
    if(username) { //only do draft once username is set
      //drafting operations via web socket
      let socket = io("http://localhost:8080", {transports : ['websocket']});
      socket.on('connect', () => {
        console.log("connected");
        console.log("Connected to server, registering user ID:", username);
        socket.emit('register', username);
      })

      socket.on('draft started', (order) => {
        setDraftInProgress(true);
        setIsLoading(true);
        let userOrder = []
        console.log(order);

        order.forEach((user) => {
          userOrder.push(user.username);
        })
        alert(`Draft Starting ... \n Order: ${userOrder.join(',')}`);

      })

      socket.on('user turn', (data) => {
        const {user, pickNumber, eventName} = data;
        setEventName(eventName);
        console.log("USER TURN", user);
        console.log("username = ", username);
        if(user.username == username) {
          alert(`It's your turn! Pick number ${pickNumber+1}`);
          setTurn(true);
        }
        else {
          alert(`It's ${user.username}'s turn`);
          setTurn(false);
        }
      })

      socket.on('announce pick', (pick) => {
        alert(`${pick.picker} selected ${pick.pick.name} pick #${pick.pickNumber}`);
        console.log(`${pick.picker} selected ${pick.pick.name} pick #${pick.pickNumber}`)

        setDraftedSwimmers(prev => [...prev, pick.pick.name]);
        

        return () => socket.off('announce pick');
      })

      socket.on('end draft', (val) => {
        setDraftInProgress(false);
        setDraftCompleted(true);
        alert("Draft Completed!");
      })


      setSocket(socket);

      return () => socket.close();
    } 
  }, [username])



  function startDraft() {
    window.location.reload(); //so that all browsers in socket are included

    let teams_in_draft = []
    teamsInfo.forEach((team, index) => {
      teams_in_draft.push(team);
    })
    currentSocket.emit('start draft', teams_in_draft);

  }

  async function draftSwimmer(index) {

    if (swimmerInfo.length === 0) {
      console.error("Swimmer info is not yet available.");
      return;
    }

    const swimmer = swimmerInfo[index];
    console.log(currentEventName);
    let res = await draftSwimmer_(swimmer, currentSocket, currentEventName); //drafts swimmer and emits

    if (res) {
      let teamRoster_ = await getRoster();
      setTeamRoster(teamRoster_.swimmers);
      setTurn(false);
    }

    
  }


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
        return data.filter((d) => d.name.toLowerCase().includes(query));
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

  

  const [searchQuery, setSearchQuery] = React.useState("");
  const dataFiltered = filterData(searchQuery, swimmer_names);

  return (
      <Grid container spacing = {10} direction = 'row' justifyContent = 'flex-start' alignItems='flex-start'>
          <Grid item style = {{ marginTop: '5px', marginLeft: '5px'}}>
              <SearchBar searchQuery={searchQuery} style = {{marginTop: '10px'}} setSearchQuery={setSearchQuery}/>
              <div style={{ padding: 3 }}>
                <div style={ {marginBottom: '5px', height: '750px', width: "275px", overflowY: 'scroll'}}>

                  {dataFiltered.map((swimmer, index) => {
                  if(drafted_swimmers.includes(swimmer.name)) {
                    return null;
                  }
                  else {
                  return(
                    <button
                        key={index}
                        className="text"
                        disabled={!yourTurn}
                        onClick={() => draftSwimmer(swimmer.index)}
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
                          {swimmer.name}<br></br>  {swimmerInfo[index].team}
                      </button>
                    )}})}
                </div>
              </div>
          </Grid>
          <Grid item style = {{marginTop: '5px', marginLeft: '10%', width: '800px'}}>
            <h1 style={{margin: '0'}}>{teamInfo.name}</h1>
            <h6>{leagueInfo.name}</h6>
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
                      {teamRoster.map((swimmer, index) => (
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
          <Grid>
            <Button
                className = 'btnn'
                style={{ marginTop: '15px', marginLeft: '10px' }}
                variant="contained"
                color="primary"
                disabled={draftCompleted || isLoading}
                onClick={startDraft}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                {isLoading ? 'Loading...' : draftInProgress ? 'Draft in Progress...': draftCompleted ? 'Already Drafted':  'Start Draft'}
            </Button>
          </Grid>
        </Grid>
    );
  }
