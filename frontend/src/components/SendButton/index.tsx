import React, { Component, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TagRecord from '../../components/TagRecord';
import { default as tagStore } from '../../store/tagStore'

const useStyles = makeStyles((theme) => ({
  submit: {
    display: 'box',
    margin: theme.spacing(3, 0, 2)
  },
  hidden: {
    display:'none',
    margin: theme.spacing(3, 0, 2)
  }
}));

function SendButton() {
    const classes = useStyles();
 
    const sendTemplate = () => {
       var send = tagStore.sendTemplate({"template":"<test></test>", 
                                         "values":[{"first_name":"Dmitry", "last_name":"Roitman"}]});

    };
    const send = () => {
    };

    var submit = null;
    if (tagStore.template) {
      submit = classes.submit;
    } else {
      submit = classes.hidden;
    }
        return(
            <React.Fragment>
                             <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={send}
                              className={submit}>
                              Send Temp
                             </Button>
            </React.Fragment>);                 
}

export default observer(SendButton);
