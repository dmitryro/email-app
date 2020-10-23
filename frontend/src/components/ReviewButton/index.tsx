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

import { default as tagStore } from '../../store/tagStore'
import { useOnMount, useOnChange } from '../../utils/hooks'
const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  frame: {
    border: '1px solid #CCCCCC',
    borderRadius: '3',
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

function ReviewButton() {
    const classes = useStyles();
    const [visible, setVisible] = useState(true);
    let style = {fontSize:'1.0em', display:'none'};

    const sendTemplate = async () => {
       var payload = tagStore.fetchPayload();
       var send = await tagStore.sendTemplate(payload);
    };

    const handlePreview = () => {
       setVisible(true);
       tagStore.setTemplate('test template');
       if(visible) style.display = "box";
    }

    if (tagStore.template) {
        return(
            <React.Fragment>
                             <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={sendTemplate}
                              className={classes.submit}>
                              Send
                             </Button>
            </React.Fragment>                 
        )
    } else {
        return(<React.Fragment>
                             <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handlePreview}
                              className={classes.submit}>
                              Preview
                             </Button>
               </React.Fragment>);
    }
}

export default observer(ReviewButton);
