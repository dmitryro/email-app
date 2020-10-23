import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
  }
}));

/**
 * isEmail
 *
 * @export
 * @param {string} email
 * @returns true if email false otherwise 
 */
function isEmail(email: string) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
}


function resetError(tagid: number) {
    var id = `input-${tagid}`;
    var error = `error-${tagid}`;
    (document.getElementById(id) as HTMLTextAreaElement).style.border="1px solid #CCCCCC";
    document.getElementById(error).innerHTML="";
}


function TagRecord({name, label, tagid}) {
  const classes = useStyles();
  tagStore.addButton = <AddCircleOutlineIcon color="secondary" aria-label="add an tag" />;
  var inputEl = useRef();
  var icon = <AddCircleOutlineIcon ref={inputEl} color="primary" aria-label="add an tag" />;
  var id = `input-${tagid}`;
  var error = `error-${tagid}`;
  var key = `input-${tagid}`;

  const addRecord = () => {
     let value = (document.getElementById(id) as HTMLTextAreaElement).value;

     if (!value || value.length <=0) {
            (document.getElementById(id) as HTMLTextAreaElement).style.border="2px solid red";
            document.getElementById(error).innerHTML="<div style='position:relative;color:red;font-size:0.8em;margin-top:0.2em;margin-left:1.6em;'>This field is required!</div>";
            setTimeout(resetError.bind(null, tagid), 500);
     }  else {
         if (name === 'to' || name === 'email' || name==='from') {
              if (!isEmail(value)) {
                 (document.getElementById(id) as HTMLTextAreaElement).style.border="2px solid red";
                 document.getElementById(error).innerHTML="<div style='position:relative;color:red;font-size:0.8em;margin-top:0.2em;margin-left:1.6em;'>Invalid email format!</div>";
                  setTimeout(resetError.bind(null, tagid), 500);                  
 
              } else {
                  var tag = {'name':name, 'label':label, 'value': value, 'id':tagid};
                  tagStore.addUsed(tag);
              }
         } else {
             var tag = {'name':name, 'label':label, 'value': value, 'id':tagid};
             tagStore.addUsed(tag);
         }
     }
  }

  const deleteRecord = () => {
      tagStore.deleteSelected(tagid);
  };
  
  return (
      <div className={classes.row}> 
      <Grid container spacing={2}>
        <Grid item xs={3}> 
            <Typography className={classes.title} color="textSecondary" gutterBottom>{name}</Typography>
        </Grid>
        <Grid item xs={6}>
            <TextField
                ref={inputEl}
                key={key}
                size="small" 
                className={classes.input}
                autoComplete="uname"
                name={name}
                variant="outlined"
                required
                fullWidth
                id={id}
                label="Value"
                autoFocus
              />
              <div id={error}></div>
        </Grid>
        <Grid item xs={1}>
           <IconButton aria-label="add" color="primary" onClick={addRecord}>
             { icon }
           </IconButton>
        </Grid>
        <Grid item xs={1}>
         <DeleteIcon className={classes.icon} onClick={deleteRecord} color="primary" fontSize="small"/>
        </Grid>          
      </Grid>
      </div>);
}

export default observer(TagRecord);
