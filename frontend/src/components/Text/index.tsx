import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react'
import { default as tagStore } from '../../store/tagStore'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: '0.6em',
    marginLeft: '1.0em'
  },
  row: {
    margin: '0.8em 0 0.8em 0',
  },
  title: {
    paddingTop: '0.8em',
    color: "primary",
    fontSize: '0.8em'
  }
}));

function Text({value, id}) {
  const classes = useStyles();


  return (
      <div className={classes.row}> 
      <Grid container spacing={2}>
        <Grid item xs={3}> 
              <React.Fragment>
                <div id={id}>
                 <Typography className={classes.title}  color="textSecondary" gutterBottom>
                   {value}
                 </Typography>
                </div>
             </React.Fragment>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={3}> 
        </Grid>
      </Grid>
      </div>);
}

export default observer(Text);
