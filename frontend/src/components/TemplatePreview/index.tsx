import React, { Component, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TagRecord from '../../components/TagRecord';
import TagTable from '../../components/TagTable';
import RenderTemplate from '../../components/RenderTemplate'; 

import { default as tagStore } from '../../store/tagStore'
import { useOnMount, useOnChange } from '../../utils/hooks'
const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  frame: {
    width: '100%',
    height: '100%'
  },
  icon: {
    marginTop: '0.6em',
    marginLeft: '1.0em'
  },
  row: {
    margin: '0.8em 0 0.8em 0',
  },
  hiddenError: {
    display:'none',
    color:'red'
  },
  textError: {
    border: '1px solid red',
  },
  displayError: {
    display:'box',
    color:'red',
    marginTop:'1.2em',
    marginLeft: '0.2em',
    fontSize: '0.8em'
  },
  displayErrorHidden: {
    display:'none',
    color:'red',
    marginTop:'1.2em',
    marginLeft: '0.2em',
    fontSize: '0.8em'
  },
  title: {
    paddingTop: '0.8em',
    color: "primary",
    fontSize: '0.8em'
  },
}));

function TemplatePreview() {
    const classes = useStyles();

    const sendTemplate = () => {
    };
    if (tagStore.template) {
    return(
        <React.Fragment>
            <div className={classes.frame}>     
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <RenderTemplate propagate={true}/>
                </Grid>

                <Grid item xs={12}>
                    <RenderTemplate propagate={false}/>
                </Grid>


                <Grid item xs={9}>

                </Grid>
                <Grid item xs={3}>
                </Grid>
           </Grid>
           </div>
        </React.Fragment>                 
    )
    } else {
        return(<React.Fragment></React.Fragment>);
    }
}

export default observer(TemplatePreview);
