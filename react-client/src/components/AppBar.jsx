import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('');
  const [state, setState] = React.useState('');


  const handleChange = (e) => {
    setState(e.target.value);
    props.changeSortStirng(e.target.value);
    handleDrawerClose();
  }

  const searchingString = (e) => {
    setSearch(e.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap onClick={() => {props.reset()}}>
            MVP
          </Typography>

          <div className={classes.search} style={{ position: 'fixed', right: 20 }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); let str = search; setSearch(''); props.getGameBySearch(str) }}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={search}
                onChange={(e) => { searchingString(e) }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <FormControl className={classes.formControl}>
          <InputLabel>Developer</InputLabel>
          <Select
            native
            value={state}
            onChange={handleChange}
            inputProps={{
              name: 'Developer',
              id: 'developer-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={['feral-interactive', 'developers']}>Feral Interactive</option>
            <option value={['valve-software', 'developers']}>Valve Software</option>
            <option value={['ubisoft', 'developers']}>Ubisoft</option>
            <option value={["sony-interactive-entertainment", 'developers']}>Sony Interactive Entertainment</option>
            <option value={["electronic-arts", 'developers']}>Sony Interactive Entertainment</option>
            <option value={["ubisoft-montreal", 'developers']}>Ubisoft Montreal</option>
            <option value={["square-enix", 'developers']}>Square Enix</option>
            <option value={["capcom", 'developers']}>Capcom</option>
          </Select>
        </FormControl>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Platform</InputLabel>
          <Select
            native
            value={state}
            onChange={handleChange}
            inputProps={{
              name: 'Platform',
              id: 'age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={['pc', 'platforms']}>PC</option>
            <option value={['playstation5', 'platforms']}>PlayStation 5</option>
            <option value={['xbox-one', 'platforms']}>Xbox One</option>
            <option value={["playstation4", 'platforms']}>PlayStation 4</option>
            <option value={["xbox-series-x", 'platforms']}>Xbox Series S/X</option>
            <option value={["nintendo-switch", 'platforms']}>Nintendo Switch</option>
            <option value={["ios", 'platforms']}>IOS</option>
            <option value={["android", 'platforms']}>Android</option>
          </Select>
        </FormControl>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Genre</InputLabel>
          <Select
            native
            value={state}
            onChange={handleChange}
            inputProps={{
              name: 'Genre',
              id: 'age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={['action', 'genres']}>Action</option>
            <option value={['indie', 'genres']}>Indie</option>
            <option value={['adventure', 'genres']}>Adventure</option>
            <option value={["role-playing-games-rpg", 'genres']}>RPG</option>
            <option value={["strategy", 'genres']}>Strategy</option>
            <option value={["shooter", 'genres']}>Shooter</option>
            <option value={["casual", 'genres']}>Casual</option>
            <option value={["simulation", 'genres']}>Simulation</option>
            <option value={["puzzle", 'genres']}>Puzzle</option>
            <option value={["arcade", 'genres']}>Arcade</option>
            <option value={["platformer", 'genres']}>Platformer</option>
            <option value={["racing", 'genres']}>Racing</option>
          </Select>
        </FormControl>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Creator</InputLabel>
          <Select
            native
            value={state}
            onChange={handleChange}
            inputProps={{
              name: 'Creator',
              id: 'age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={['cris-velasco', 'creators']}>Cris Velasco</option>
            <option value={['dan-houser', 'creators']}>Dan Houser</option>
            <option value={['jesper-kyd', 'creators']}>Jesper Kyd</option>
            <option value={["inon-zur", 'creators']}>Inon Zur</option>
            <option value={["mike-morasky", 'creators']}>Mike Morasky</option>
            <option value={["sonic-mayhem", 'creators']}>Sascha Dikiciyan</option>
            <option value={["jason-graves", 'creators']}>Jason Graves</option>
            <option value={["aaron-garbut", 'creators']}>Aaron Garbut</option>
            <option value={["kelly-bailey", 'creators']}>Kelly Bailey</option>
            <option value={["leslie-benzies", 'creators']}>Leslie Benzies</option>
          </Select>
        </FormControl>
        <Divider />

        {/* <List>
            {['Developer', 'Platform', 'Genre', 'Creator'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Most Popular', 'Date'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >

      </main>
    </div>
  );
}
