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
  message: {
    marginTop: '1.6em',
  }
}));

function SentMessage() {
    const classes = useStyles();
    const [message, setMessage] = useState(tagStore.sentMessage);
    let style = {fontSize:'1.0em', display:'none'};

    useEffect(() => {
         setMessage(tagStore.sentMessage);
    });
    return(
            <React.Fragment>
             <div className={classes.message}>
                 <span style={{color:tagStore.messageStyle.color, display: tagStore.messageStyle.display}} > {message} </span>
             </div>
            </React.Fragment>                 
        )
}
export default observer(SentMessage);
