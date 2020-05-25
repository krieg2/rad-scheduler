import React, { useState } from 'react';
import {
    Button,
    Grid,
    TextField,
    Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { requestEvents } from '../../redux/actions';
import { addEvent } from '../../utils/api';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ requestEvents }, dispatch);
};

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 0,
    width: 150
  },
  textField: {
    '& fieldset': {
      borderRadius: 0
    }
  },
  table: {
    minWidth: 300
  }
}));

const EventInput = ({ requestEvents }) => {
  const classes = useStyles();
  const initialValues = { organizer: '', date: '', venue: '' };
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleButtonClick = async (event) => {
    event.preventDefault();

    try {
      await addEvent({ ...values });
      setMessage("Success");
      setOpen(true);
      setValues(initialValues);
      requestEvents();
    } catch (err) {
      setMessage("Error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={10}>
          <h2>Add Event</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <Grid container spacing={2} direction="row" alignItems="center" justify="flex-start">
              <Grid item xs={2}>
                <span>Organizer:</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  value={values.organizer}
                  onChange={handleChange('organizer')}
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={2}>
                <span>Venue:</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  value={values.venue}
                  onChange={handleChange('venue')}
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={2}>
                <span>Date:</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  value={values.date}
                  onChange={handleChange('date')}
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleButtonClick}>
            Add
          </Button>
        </Grid>
      </Grid>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={handleClose} message={message} />
    </Grid>
  );
};

export default connect(null, mapDispatchToProps)(EventInput);