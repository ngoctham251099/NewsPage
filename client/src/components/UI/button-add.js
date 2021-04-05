import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default function ButtonSizes(props) {

  const {title, onClick, type, color = 'primary'} = props;

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
        <Button variant="contained" style={{marginTop: '16px'}}size="large" color={color} className={classes.margin} onClick={onClick} type={type}>
          {title}
        </Button>
      </div>
    </div>
  );
}