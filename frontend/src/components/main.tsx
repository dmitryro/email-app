import * as React from 'react';
import "./../../src/assets/css/main.css";
import Design from "./design";
let classNameHeader = "main";

export default class Main extends React.Component {
    render() {
        return <div className={classNameHeader}>
               <Design/>
               </div>;
    }
}

