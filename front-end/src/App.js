import React from 'react';
import theme from './theme';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Main } from './pages';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
