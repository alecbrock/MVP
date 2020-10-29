import React from 'react';
import ListItem from './ListItem.jsx';
import Grid from '@material-ui/core/Grid';

const List = (props) => {
  return (
    <Grid container>

      { props.videoGameList.map((game, i) => ( game !== null ? <ListItem game={game} key={i} /> : null))}
    </Grid>

  )
}

export default List;