import React, { Component, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import TagRecord from '../../components/TagRecord';
import TagTable from '../../components/TagTable';

import { default as tagStore } from '../../store/tagStore'
import { useOnMount, useOnChange } from '../../utils/hooks'
const animatedComponents = makeAnimated();

function TagSelector() {

    const [selectedOption, setSelectedOption] = useState([]);
    useEffect(() => {
    });
   
    useOnMount(tagStore.readTags);
    
    const handleMenu = (v) => {
         var max_id = 1;
         var found = false;

         for(var i=0; i<tagStore.selected.length; i++) {
              if(v.value===tagStore.selected[i].value) {
                  found = true;
              }
              if (tagStore.selected[i].id > max_id) {
                  max_id = tagStore.selected[i].id;
              }
         }

         if (!found) {
             v.id = max_id+1;
             tagStore.addSelected(v);
             setSelectedOption(v);
         }
    }; 
    return(
        <React.Fragment>     
                         <Select
                          value={selectedOption}
                          onChange={handleMenu}
                          style={{ zIndex: -1}}
                          hideSelectedOptions={false}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          multi          
                          options={tagStore.tags}
                          />
                          <TagTable selected={tagStore.selected}/>
         </React.Fragment>                 
    )
}

export default observer(TagSelector);
