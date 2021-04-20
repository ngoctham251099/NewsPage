import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      margin: '8px 0px',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '8px 0px',
    width: "99%"
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">{props.value}</InputLabel> */}
        <Select
          id="demo-customized-select"
          value={props.value}
          onChange={props.onChange}
          input={<BootstrapInput />}
        >
          {/* <MenuItem value="0">None</MenuItem> */}
          {props.list ? 
            (props.list.map((item, index) => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))): null
          }
            
          {
            props.listPower ? (
              (props.listPower.map((item) => (
                <MenuItem value={item.id}>{item.value}</MenuItem>
              )))
            ): null
          }

          {
            props.listQL ? (
              (props.listQL.map((item) => (
                <MenuItem value={item._doc._id}>{item._doc.username}</MenuItem>
              )))
            ): null
          }

        </Select>
      </FormControl>
      
    </div>
  );
}