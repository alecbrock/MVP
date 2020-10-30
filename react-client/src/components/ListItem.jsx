import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Image from 'react-image-resizer';
import StarMaker from './StarMaker.jsx';
const useStyles = makeStyles({
  root: {
    maxWidth: 545,
  },
  media: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  write: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '100%',
    color: '#fff',


  },
  star: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: '100%',
  }
});

const ListItem = (props) => {
  console.log(props.game, 'this IS NEW GAME');
  const classes = useStyles();
  return (

    <Grid item xs={6} style={{padding: 20}}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.game.background_image}
            title={props.game.name}
          />
          <CardContent>
            {props.game.description_raw.length > 250 ? <Typography variant='body2' color="textSecondary" component="p">{props.game.description_raw.slice(0, 250)}...</Typography> : <Typography variant="body2" color="textSecondary" component="p">{props.game.description_raw}</Typography>}
            <Typography id='name' className={classes.write} variant='h6'>{props.game.name}</Typography>
            <StarMaker className={classes.star} rating={props.game.rating}/>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </CardActions>
      </Card>
    </Grid>

  )
}

export default ListItem;