import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { default as tagStore } from '../../store/tagStore'
import Tag from '../Tag';
import Text from '../Text';

function Canvas({used}) {
    var rows = [];
    for (var i=0; i<used.length; i++) {
            if (used[i].type === 'tag') {
                rows.push(<Tag name={used[i].name} label={used[i].label} 
                               value={used[i].value} tagid={used[i].id}/>);
            } else {
                rows.push(<Text value={used[i].value} id={used[i].id}/>);
            }
    }

    return (
         <div>
              {rows}
         </div>
    ); 
}

export default observer(Canvas);
