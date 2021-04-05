import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default function ButtonSizes(props) {
  const classes = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  return (
    <div>
      <div>
        <Button variant="contained" style={{marginTop: '16px'}}size="large" color="primary" className={classes.margin} onClick={props.onClick} type={props.type}>
          {props.title}
        </Button>
      </div>
    </div>
  );
}