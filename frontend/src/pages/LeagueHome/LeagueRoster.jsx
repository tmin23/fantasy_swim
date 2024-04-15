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
import { Icon } from '@mui/material';

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
        <Box sx={{ width: '20%', height: '100%', bgcolor: 'background.paper', p: '10px'}}>
          {/* Search bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          {/* Virtualized list of filtered swimmers */}
          <div style={{ padding: 3 }}>
            {/* Mapping through the filtered swimmers array and rendering them */}
            {dataFiltered.map((swimmer, index) => (
            <div
                className="text"
                style={{
                    padding: 5,
                    justifyContent: "normal",
                    fontSize: 20,
                    color: "blue",
                    margin: 1,
                    width: "250px",
                    border: "1px solid green", // corrected BorderColor to border
                    borderRadius: "10px", // added border radius for rounded corners
                    backgroundColor: "#f0f0f0" // added background color
                }}
                key={index} // Using index as the key since there might not be unique IDs
            >
                {swimmer}
            </div>
            ))}
        </div>
        </Box>
      );
    }
