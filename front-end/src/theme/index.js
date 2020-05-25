import { createMuiTheme } from '@material-ui/core';
import palette from './palette';

const theme = createMuiTheme({
  palette,
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;