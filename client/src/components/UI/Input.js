import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

export default function Input(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-secondary"
        label= {props.title}
        variant="outlined"
        color="secondary"
        type = {props.type}
        multiple = {props.multiple}
        onChange={props.onChange}
        value={props.value}
        placeholder = {props.placeholder}
      />
    </div>
  );
}
