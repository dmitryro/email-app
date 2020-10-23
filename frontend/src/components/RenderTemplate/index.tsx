import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import { default as tagStore } from '../../store/tagStore';

const useStyles = makeStyles((theme) => ({
  frame: {
    border: '1px solid #CCCCCC',
    borderRadius: '3',
    marginBottom:'2.0em',
  }
}));

function RenderTemplate({propagate}) {
    const classes = useStyles();
    var template = "";
    var title = null;

    if (!propagate) {
         title = "Template without values";
    } else {
         title = "Template with values";
    }   
         
    for(var i=0; i<tagStore.used.length; i++) {
        if (tagStore.used[i].value.includes('new_line') || 
            tagStore.used[i].value.includes('[new_line]') ||
            tagStore.used[i].value.includes('{new_line}')) {
               template += '<br/>\n\n';
        } else {
            if (!propagate) {
                if (tagStore.used[i].type==='text') {
                    template += ` ${tagStore.used[i].value}`;
                } else {
                    template += ` {{${tagStore.used[i].name}}}`;
                }
            } else {
                if(`{${tagStore.used[i].name}}`.includes('{to}')) {
                    template += ` TO: ${tagStore.used[i].value}`;
                } else if (`{${tagStore.used[i].name}}`.includes('{from}')) {
                    template += ` FROM: ${tagStore.used[i].value}`;
                } else {
                    template += ` ${tagStore.used[i].value}`;
                }
            }
        }
    }
    return(
        <React.Fragment>
           <fieldset className={classes.frame}>
                 <legend>{title}</legend>
                  {template}
           </fieldset>
        </React.Fragment>                 
    )
}
export default observer(RenderTemplate);
