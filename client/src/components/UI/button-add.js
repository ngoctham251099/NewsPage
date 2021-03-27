import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ButtonSizes(props) {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={props.onClick}>
          Large
        </Button>
      </div>
    </div>
  );
}