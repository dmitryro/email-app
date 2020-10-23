import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Fade } from '@material-ui/core';

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
  message: {
    width: '100%',
    height:'20px',
    color: 'red',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    height: '10',
    marginLeft: '1.0em',
    marginTop: '0.2em',
    marginBottom: '0.2em'
  },
  textarea: {
    height: '10',
    width: '18',
    marginLeft: '1.0em',
    marginTop: '0.2em',
    marginBottom: '0.2em',
    borderRadius: 3,
  }
}));

function resetError() {
    (document.getElementById('message-text') as HTMLTextAreaElement).style.border="1px solid #CCCCCC";
    document.getElementById('text-error-message').innerHTML="";
}

function TextBlock() {
  const classes = useStyles();
  var fader = classes.displayError;
  const rows = 6;
  const cols = 43;
  const fout = 400;
  const fin = true;
  const timeout = 200;

  var error = classes.hiddenError;
  const elRef = useRef();
  const onSubmit = data => {
        console.log(data);
  };


  const addText = () => {
      let value = (document.getElementById('message-text') as HTMLTextAreaElement).value;          
      let id = tagStore.used.length+1;

      if (!value || value.length <=0) {
            (document.getElementById('message-text') as HTMLTextAreaElement).style.border="1px solid red";
            document.getElementById('text-error-message').innerHTML="<div style='position:relative;color:red;font-size:0.8em;margin-top:1.2em;margin-left:0.2em;'>This field is required!</div>";
            setTimeout(resetError, 500);
      } else {
            resetError();
            tagStore.addText({"id":`text-${id}`, "value": value});
            document.getElementById('text-error-message').style.display = "none"; 
            (document.getElementById('message-text') as HTMLTextAreaElement).value = "";
      }
  }

  
  return (
      <div className={classes.row}> 
      <Grid container spacing={1}>
        <Grid item xs={12}> 
            <Typography className={classes.title} color="textSecondary" gutterBottom>Add Text (for new line use [new_line])</Typography>
        </Grid>
        <Grid item xs={12}>
            
              <TextareaAutosize style={{ marginBottom: '-1.6em', marginLeft:'0.2em', minHeight: 40,  maxHeight: 80, border: '1px solid #cccccc', borderRadius: 3 }}
               rows={rows} cols={cols} id="message-text"
              />
        </Grid>
        <Grid item xs={9}>
            
            <div id="text-error-message"></div>
        </Grid>
          <Grid item xs={3}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={addText}
                className={classes.submit}
              >
                Add
              </Button>
        </Grid>
      </Grid>
      </div>);
}

export default observer(TextBlock);
