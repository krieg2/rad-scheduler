import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Button,
    Grid,
    LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { requestEvents } from '../../redux/actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ events, isFetching }) => {
  return {
    events,
    isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ requestEvents }, dispatch);
};

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 0,
    width: 150
  },
  table: {
    minWidth: 300
  },
  spinner: {
  }
}));

const Schedule = ({ events, isFetching, requestEvents }) => {
  const classes = useStyles();

  useEffect(() => {
    requestEvents();
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    requestEvents();
  };

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={10}>
          <h2>Here are the events in the database:</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={10}>
          <TableContainer component={Paper} elevation={1} square>
            {isFetching ? <LinearProgress className={classes.spinner} /> : null}
            <Table className={classes.table} aria-label="table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Organizer</TableCell>
                  <TableCell align="left">Venue</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {events && events.map(e => (
                <TableRow key={e.id}>      
                  <TableCell align="left">{e.organizer}</TableCell>
                  <TableCell align="left">{e.venue}</TableCell>
                  <TableCell align="left">{e.date}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleButtonClick}>
            Refresh / Read
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);