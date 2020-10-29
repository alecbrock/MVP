import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function StarMaker(props) {
  return (
    <div>

      <Typography component="legend">{props.rating}</Typography>
      <Rating name="read-only" value={props.rating} readOnly />

    </div>
  )
};