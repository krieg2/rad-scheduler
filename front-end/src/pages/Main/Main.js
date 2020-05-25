import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Schedule, EventInput } from '../../components';

const useStyles = makeStyles(theme => ({
    root: {
      height: '100%'
    }
  }));

const Main = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2} direction="row" alignItems="center" justify="center">
        <Grid item xs={10}>
          <h2>Welcome to the Ride-and-Drive Event Database!</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="center" justify="center">
        <Grid item xs={10}>
          <Schedule />
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="center" justify="center">
        <Grid item xs={10}>
          <EventInput />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;