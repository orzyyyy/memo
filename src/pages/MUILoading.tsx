import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      height: '100vh',
      'justify-content': 'center',
      'align-items': 'center',
    },
  }),
);

const CircularIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default CircularIndeterminate;
