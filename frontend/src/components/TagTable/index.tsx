import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { default as tagStore } from '../../store/tagStore'
import TagRecord from '../TagRecord';

function TagTable({selected}) {
    var rows = [];
    
    const handleClearRows = () => {
    };
    if (selected.length >0 ) {
        for (var i=0; i<selected.length; i++) {
            var key = `key=${selected[i].id}`;
            rows.push(<TagRecord name={selected[i].value} label={selected[i].label} key={key} tagid={selected[i].id}/>);
        }
    } 

    return (
         <div>
              {rows}
         </div>
    ); 
}

export default observer(TagTable);
